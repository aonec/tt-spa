import axios from 'axios';
import { createEvent, createStore } from 'effector';

const devUrl = 'https://management.transparent-technology.ru:1443/api';
const baseURL = process.env.REACT_APP_API_URL || devUrl;

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
    if (status === 401 && !checkUrl('login', error.config.url)) {
      const { config } = error;

      return new Promise((resolve) => {
        if (!$isRefreshRunning.getState()) {
          setIsRefreshRunning(true);
          axios.post('/auth/refreshToken').then(
            () => {
              setIsRefreshRunning(false);

              return resolve(axios(config));
            },
            () => {
              localStorage.clear();
              window.location.replace('/login');
            }
          );
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
  }
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
