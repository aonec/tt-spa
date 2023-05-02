import axios from '01/axios';
import { createDomain, createEvent } from 'effector';
import { createForm } from 'effector-forms/dist';

const domain = createDomain('developmentSettings');

const $isDevSettingsModalOpen = domain.createStore(false);

const devApiURL = localStorage.getItem('dev-api-url');

if (devApiURL) {
  axios.defaults.baseURL = devApiURL;
}

const apiURL = axios.defaults.baseURL;

const devSettingsForm = createForm({
  fields: {
    devUrl: {
      init: apiURL,
    },
  },
});

const openDevSettingsModal = domain.createEvent();
const closeDevSettingsModal = createEvent();

$isDevSettingsModalOpen
  .on(openDevSettingsModal, () => true)
  .reset(closeDevSettingsModal);

devSettingsForm.fields.devUrl.$value.watch((url) => {
  axios.defaults.baseURL = url;

  if (url) localStorage.setItem('dev-api-url', url);
});

export const developmentSettingsService = {
  inputs: {
    openDevSettingsModal,
    closeDevSettingsModal,
  },
  outputs: {
    $isDevSettingsModalOpen,
    devSettingsForm,
  },
};
