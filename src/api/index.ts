import { createEvent, createStore } from 'effector';

const devUrl = 'https://stage.k8s.transparent-technology.ru/api/';
const devApiURL = localStorage.getItem('dev-api-url');

export const baseURL = import.meta.env.VITE_API_URL || devUrl;

const apiURL = devApiURL || baseURL;

const setDevUrl = createEvent<string>();
const $devUrl = createStore(apiURL || '').on(setDevUrl, (_, devUrl) => devUrl);

export const apiService = {
  outputs: {
    $devUrl,
  },
  inputs: {
    setDevUrl,
  },
};
