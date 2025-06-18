import { createEvent, createStore } from 'effector';

// const devUrl = 'https://prod.k8s.transparent-technology.ru/api/';
// const devApiURL = localStorage.getItem('dev-api-url');

export const baseURL = 'https://prod.k8s.transparent-technology.ru/api/'; // import.meta.env.VITE_API_URL || devUrl;

const apiURL = 'https://prod.k8s.transparent-technology.ru/api/';;

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
