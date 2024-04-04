import { createEvent, createStore } from 'effector';
import { featureToggles } from 'featureToggles';
import { FeatureToggles, FeatureTogglesSet } from './developmentSettings.types';
import { persist } from 'effector-storage/local';

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

persist<FeatureToggles>({
  store: $featureToggles,
  key: 'featureToggles',
  deserialize: (value) => {
    const originalKeys = Object.keys(featureToggles);

    const data = JSON.parse(value);

    const toggles = Object.entries(data).filter(([key]) =>
      originalKeys.includes(key),
    );

    return toggles.reduce(
      (acc, [key, value]) => ({ ...acc, [key]: value }),
      {},
    );
  },
  serialize: (data) => {
    const originalKeys = Object.keys(featureToggles);

    const toggles = Object.entries(data).filter(([key]) =>
      originalKeys.includes(key),
    );

    const features = toggles.reduce(
      (acc, [key, value]) => ({ ...acc, [key]: value }),
      {},
    );

    const dataString = JSON.stringify(features);

    return dataString;
  },
});

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
