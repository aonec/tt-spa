import { featureToggles } from 'featureToggles';

export type DevelopmentSettingsContainerProps = {
  isAuth?: boolean;
};

export type FeatureToggles = typeof featureToggles;

export type FeatureTogglesSet = {
  [key: string]: boolean;
};
