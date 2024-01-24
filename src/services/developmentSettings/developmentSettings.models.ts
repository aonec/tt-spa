import { createEvent, createStore } from 'effector';
import { persist } from 'effector-storage/local';
import { featureToggles } from 'featureToggles';
import { FeatureToggles } from './developmentSettings.types';

const $isDevSettingsModalOpen = createStore(false);

const devUrl = 'https://stage.k8s.transparent-technology.ru/api/';
const devApiURL = localStorage.getItem('dev-api-url');

export const baseURL = process.env.REACT_APP_API_URL || devUrl;

const apiURL = devApiURL || baseURL;

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
