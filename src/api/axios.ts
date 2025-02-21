import axios from 'axios';
import { createEvent, createStore } from 'effector';
import { apiService } from 'api';
import { tokensService } from './tokensService';
import { forbiddenList } from '../utils/403handling';
import { notification, message } from 'antd';
import { cancellableUrl } from 'services/cancelRequestService/cancelRequestService.constants';
import { cancelRequestService } from 'services/cancelRequestService';
import { isUndefined } from 'lodash/fp';

export const isDevMode = true;

let refreshPromise: null | Promise<unknown> = null;
const clearPromise = () => (refreshPromise = null);

axios.defaults.baseURL = apiService.outputs.$devUrl.getState();

apiService.outputs.$devUrl.watch((url) => {
  axios.defaults.baseURL = url;

  if (url) localStorage.setItem('dev-api-url', url);
});

axios.interceptors.request.use((req) => {
  req.headers.Authorization = `Bearer ${takeFromLocStor('token')}`;
  req.headers['x-user-path'] = window.location.pathname || 'none';

  if (req.url && cancellableUrl.some((regex) => regex.test(req.url!))) {
    cancelRequestService.inputs.cancelRequest(req.url);

    const token = axios.CancelToken.source();
    req.cancelToken = token.token;

    cancelRequestService.inputs.setToken({ url: req.url, token: token });
  }

  if (req.url && checkUrl('refreshToken', req.url)) {
    req.data = {
      token: takeFromLocStor('token'),
      refreshToken: takeFromLocStor('refreshToken'),
    };
  }
  return req;
});

axios.interceptors.response.use(
  ({ data, config }) => {
    const { url } = config;

    if (url && checkUrl('(login|refresh)', url)) {
      const { token, refreshToken, roles, permissions } = data;

      tokensService.inputs.setToken(token);
      tokensService.inputs.setRefreshToken(refreshToken);

      saveToLocalStorage('permissions', permissions);
      if (checkUrl('login', url)) saveToLocalStorage('roles', roles);
    }

    if (url && checkUrl('(users/current)', url)) {
      const user = data;
      saveToLocalStorage('user', user);
    }

    setIsOnline();
    const res = data;

    return res;
  },
  async (error) => {
    const status = error?.response?.status;
    const config = error.config;

    if (!axios.isCancel(error) && isUndefined(status) && $isOnline.getState()) {
      notification.error({
        description: 'Проверьте свое подключение к интернету',
        message: 'Ошибка связи',
      });
      setIsOffline();
    }

    if (
      status === 403 &&
      forbiddenList.some(
        (forbiddenUrl) =>
          forbiddenUrl.methods.includes(
            error?.response.config.method.toUpperCase(),
          ) && forbiddenUrl.regExp.test(error.config.url),
      ) &&
      !config._retry
    ) {
      message.error(
        'У вашего аккаунта нет доступа к выбранному действию. Уточните свои права у Администратора',
      );
    }

    if (status === 401 && checkUrl('refresh', error.config.url)) {
      tokensService.inputs.deleteToken();
      tokensService.inputs.deleteRefreshToken();
      tokensService.inputs.redirectToLogin();
      return;
    }

    if (status === 401 && !checkUrl('login|Auth/confirm', error.config.url)) {
      const { config } = error;

      config._retry = true;

      if (!refreshPromise) {
        refreshPromise = axios.post('/auth/refreshToken').finally(clearPromise);
      }

      const token = await refreshPromise;
      config.headers.authorization = `Bearer ${token}`;

      return axios(config);
    }

    return Promise.reject(error);
  },
);

function saveToLocalStorage(name: string, data: string) {
  localStorage.setItem(name, JSON.stringify(data));
}

function takeFromLocStor(name: string) {
  const value = localStorage.getItem(name);

  if (!value) return;

  return JSON.parse(value);
}

function checkUrl(str: string, url: string) {
  return new RegExp(str, 'gi').test(url);
}

const setIsOffline = createEvent();
const setIsOnline = createEvent();
const $isOnline = createStore(true)
  .on(setIsOffline, () => false)
  .on(setIsOnline, () => true);

export default axios;

export { axios };
