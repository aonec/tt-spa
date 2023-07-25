import { FeatureToggles } from 'services/developmentSettings/developmentSettings.types';

export type DevelopmentSettingsModalProps = {
  visible: boolean;
  closeDevSettingsModal: () => void;
  setDevUrl: (url: string) => void;
  devUrl: string;
  featureToggles: FeatureToggles;
  toggleFeature: (feature: string) => void;
  resetFeatureToggles: () => void;
  isAuth: boolean;
};
