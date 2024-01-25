import { createEvent, createStore } from 'effector';
import { featureToggles } from 'featureToggles';
import { FeatureToggles, FeatureTogglesSet } from './developmentSettings.types';

const $isDevSettingsModalOpen = createStore(false);

const openDevSettingsModal = createEvent();
const closeDevSettingsModal = createEvent();

const setFeatureToggles = createEvent<FeatureTogglesSet | null>();
const toggleFeature = createEvent<string>();
const resetFeatureToggles = createEvent();

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

$isDevSettingsModalOpen
  .on(openDevSettingsModal, () => true)
  .reset(closeDevSettingsModal);

export const developmentSettingsService = {
  inputs: {
    openDevSettingsModal,
    closeDevSettingsModal,
    toggleFeature,
    resetFeatureToggles,
    setFeatureToggles,
  },
  outputs: {
    $isDevSettingsModalOpen,
    $featureToggles,
  },
};
