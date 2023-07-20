import axios from 'axios';
import { createEvent, createStore } from 'effector';
import { forbiddenList } from '../01/403handling';
import { message } from 'antd';

export const devUrl = 'https://stage.k8s.transparent-technology.ru/api/';

export const baseURL = process.env.REACT_APP_API_URL || devUrl;

export const isDevMode =
  process.env.NODE_ENV === 'development' ||
  process.env.REACT_APP_API_URL === devUrl;

axios.defaults.baseURL = baseURL;

axios.interceptors.request.use((req) => {
  req.headers.Authorization = `Bearer ${takeFromLocStor('token')}`;

  if (req.url && checkUrl('refresh', req.url)) {
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
      const { token, refreshToken, roles, permissions } = data.successResponse;

      saveToLocalStorage('token', token);
      saveToLocalStorage('refreshToken', refreshToken);
      saveToLocalStorage('permissions', permissions);
      checkUrl('login', url) && saveToLocalStorage('roles', roles);
    }

    if (url && checkUrl('(users/current)', url)) {
      const user = data.successResponse;
      saveToLocalStorage('user', user);
    }

    const res = data.successResponse ?? data ?? {};

    return res;
  },
  (error) => {
    const status = error?.response?.status;

    if (
      status === 403 &&
      forbiddenList.some(
        (forbiddenUrl) =>
          forbiddenUrl.methods.includes(
            error?.response.config.method.toUpperCase(),
          ) && forbiddenUrl.regExp.test(error.config.url),
      )
    ) {
      message.error(
        'У вашего аккаунта нет доступа к выбранному действию. Уточните свои права у Администратора',
      );
    }

    if (status === 401 && checkUrl('refresh', error.config.url)) {
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      window.location.replace('/login');
      return;
    }

    if (status === 401 && !checkUrl('login|Auth/confirm', error.config.url)) {
      const { config } = error;

      return new Promise((resolve) => {
        if (!$isRefreshRunning.getState()) {
          setIsRefreshRunning(true);
          axios.post('/auth/refreshToken').then(() => {
            setIsRefreshRunning(false);

            return resolve(axios(config));
          });
        } else {
          const subscription = $isRefreshRunning.watch((isRefreshStop) => {
            if (!isRefreshStop) {
              resolve(axios(config));
              subscription.unsubscribe();
            }
          });
        }
      });
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

export const $isRefreshRunning = createStore(false);

export const setIsRefreshRunning = createEvent<boolean>();

$isRefreshRunning.on(setIsRefreshRunning, (_, value) => value);

export default axios;

export { axios };
