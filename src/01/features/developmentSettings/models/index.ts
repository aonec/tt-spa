import axios from '01/axios';
import { createEvent, createStore } from 'effector';
import { createForm } from 'effector-forms/dist';

export const $isDevSettingsModalOpen = createStore(false);

const devApiURL = localStorage.getItem('dev-api-url');

if (devApiURL) {
  axios.defaults.baseURL = devApiURL;
}

export const apiURL = axios.defaults.baseURL;

export const devSettingsForm = createForm({
  fields: {
    devUrl: {
      init: apiURL,
    },
  },
});

export const openDevSettingsModal = createEvent();
export const closeDevSettingsModal = createEvent();
