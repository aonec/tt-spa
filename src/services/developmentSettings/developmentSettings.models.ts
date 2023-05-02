import axios from '01/axios';
import { createDomain, createEvent } from 'effector';

const domain = createDomain('developmentSettings');

const $isDevSettingsModalOpen = domain.createStore(false);

const devApiURL = localStorage.getItem('dev-api-url');

if (devApiURL) {
  axios.defaults.baseURL = devApiURL;
}

const apiURL = axios.defaults.baseURL;

const openDevSettingsModal = domain.createEvent();
const closeDevSettingsModal = createEvent();

const setDevUrl = domain.createEvent<string>();

const $devUrl = domain
  .createStore(apiURL || '')
  .on(setDevUrl, (_, devUrl) => devUrl);

$isDevSettingsModalOpen
  .on(openDevSettingsModal, () => true)
  .reset(closeDevSettingsModal);

$devUrl.watch((url) => {
  axios.defaults.baseURL = url;

  if (url) localStorage.setItem('dev-api-url', url);
});

export const developmentSettingsService = {
  inputs: {
    openDevSettingsModal,
    closeDevSettingsModal,
    setDevUrl,
  },
  outputs: {
    $isDevSettingsModalOpen,
    $devUrl,
  },
};
