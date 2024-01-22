import { createEvent, createStore, sample } from 'effector';
import { persist } from 'effector-storage/local';
import { featureToggles } from 'featureToggles';
import axios from 'api/axios';
import { FeatureToggles, FeatureTogglesSet } from './developmentSettings.types';
import { currentOrganizationService } from 'services/currentOrganizationService';
import { OrganizationResponse } from 'api/types';
import { prepareFeatureToggles } from './developmentSettings.utils';

const $isDevSettingsModalOpen = createStore(false);

const devApiURL = localStorage.getItem('dev-api-url');

if (devApiURL) {
  axios.defaults.baseURL = devApiURL;
}

const apiURL = axios.defaults.baseURL;

const openDevSettingsModal = createEvent();
const closeDevSettingsModal = createEvent();

const setFeatureToggles = createEvent<FeatureTogglesSet | null>();
const toggleFeature = createEvent<string>();
const resetFeatureToggles = createEvent();

const setDevUrl = createEvent<string>();

const $featureToggles = createStore<FeatureToggles>(featureToggles)
  .on(toggleFeature, (prev, feature) => ({
    ...prev,
    [feature]: !prev[feature as keyof FeatureToggles],
  }))
  .on(resetFeatureToggles, () => ({ ...featureToggles }))
  .on(setFeatureToggles, (prev, featureToggles) =>
    featureToggles
      ? {
          ...prev,
          ...featureToggles,
        }
      : prev,
  );

persist({ store: $featureToggles, key: 'featureToggles' });

const $devUrl = createStore(apiURL || '').on(setDevUrl, (_, devUrl) => devUrl);

$isDevSettingsModalOpen
  .on(openDevSettingsModal, () => true)
  .reset(closeDevSettingsModal);

$devUrl.watch((url) => {
  axios.defaults.baseURL = url;

  if (url) localStorage.setItem('dev-api-url', url);
});

sample({
  source: currentOrganizationService.outputs.$currentManagingFirm,
  filter: (managementFirm): managementFirm is OrganizationResponse =>
    Boolean(managementFirm),
  fn: (managementFirm) => {
    const toggles = managementFirm?.platformConfiguration?.featureToggles;

    if (!toggles) return null;

    return prepareFeatureToggles(toggles);
  },
  target: setFeatureToggles,
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
