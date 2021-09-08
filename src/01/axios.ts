import axios from 'axios';

const devUrl = 'https://transparent-demo.herokuapp.com/api';
const baseURL = process.env.REACT_APP_API_URL || devUrl;

axios.defaults.baseURL = baseURL;

let cancel;
axios.interceptors.request.use((req) => {
  if (req.baseURL === 'http://84.201.132.164:8080/api') {
    delete req.headers.Authorization;
  } else {
    req.headers.Authorization = `Bearer ${takeFromLocStor('token')}`;
  }

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
      saveToLocStor('token', token);
      saveToLocStor('refreshToken', refreshToken);
      saveToLocStor('permissions', permissions);
      checkUrl('login', url) && saveToLocStor('roles', roles);
    }

    if (url && checkUrl('(users/current)', url)) {
      const user = data.successResponse;
      saveToLocStor('user', user);
    }
    const res = data.successResponse ?? data ?? {};
    return res;
  },
  (error) => {
    const status = error?.response?.status;
    if (status === 401 && !checkUrl('login', error.config.url)) {
      const { config } = error;
      return new Promise((resolve, reject) => {
        axios.post('/auth/refreshToken').then(
          () => resolve(axios(config)),
          () => {
            localStorage.clear();
            window.location.replace('/login');
          }
        );
      });
    }

    return Promise.reject(error);
  }
);

function saveToLocStor(name: string, data: string) {
  localStorage.setItem(name, JSON.stringify(data));
}

function takeFromLocStor(name: string) {
  const userName = localStorage.getItem(name);
  if (!userName) return;
  return JSON.parse(userName);
}

function checkUrl(str: string, url: string) {
  return new RegExp(str, 'gi').test(url);
}

export { cancel };
export default axios;
