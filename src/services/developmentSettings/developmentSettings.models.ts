import { createEvent, createStore } from 'effector';
import { persist } from 'effector-storage/local';
import { featureToggles } from 'featureToggles';
import axios from 'api/axios';
import { FeatureToggles } from './developmentSettings.types';

const $isDevSettingsModalOpen = createStore(false);

const devApiURL = localStorage.getItem('dev-api-url');

if (devApiURL) {
  axios.defaults.baseURL = devApiURL;
}

const apiURL = axios.defaults.baseURL;

const openDevSettingsModal = createEvent();
const closeDevSettingsModal = createEvent();

const toggleFeature = createEvent<string>();
const resetFeatureToggles = createEvent();

const setDevUrl = createEvent<string>();

const $featureToggles = createStore<FeatureToggles>(featureToggles)
  .on(toggleFeature, (prev, feature) => ({
    ...prev,
    [feature]: !prev[feature as keyof FeatureToggles],
  }))
  .on(resetFeatureToggles, () => ({ ...featureToggles }));

persist({ store: $featureToggles, key: 'featureToggles' });

const $devUrl = createStore(apiURL || '').on(setDevUrl, (_, devUrl) => devUrl);

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
