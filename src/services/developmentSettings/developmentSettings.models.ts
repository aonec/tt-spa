import { createDomain, createEvent } from 'effector';
import { persist } from 'effector-storage/local';
import { featureToggles } from 'featureToggles';
import axios from '01/axios';
import { FeatureToggles } from './developmentSettings.types';

const domain = createDomain('developmentSettings');

const $isDevSettingsModalOpen = domain.createStore(false);

const devApiURL = localStorage.getItem('dev-api-url');

if (devApiURL) {
  axios.defaults.baseURL = devApiURL;
}

const apiURL = axios.defaults.baseURL;

const openDevSettingsModal = domain.createEvent();
const closeDevSettingsModal = createEvent();

const toggleFeature = domain.createEvent<string>();
const resetFeatureToggles = domain.createEvent();

const setDevUrl = domain.createEvent<string>();

const $featureToggles = domain
  .createStore<FeatureToggles>(featureToggles)
  .on(toggleFeature, (prev, feature) => ({
    ...prev,
    [feature]: !prev[feature],
  }))
  .on(resetFeatureToggles, () => ({ ...featureToggles }));

persist({ store: $featureToggles, key: 'featureToggles' });

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
    toggleFeature,
    resetFeatureToggles,
  },
  outputs: {
    $isDevSettingsModalOpen,
    $devUrl,
    $featureToggles,
  },
};
