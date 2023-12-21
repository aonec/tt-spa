import { FeatureTogglesResponse } from 'api/types';
import { FeatureTogglesSet } from './developmentSettings.types';

const togglesDisctionary: {
  [key in keyof FeatureTogglesResponse]: string[];
} = {
  sealService: ['services', 'districtsManage'],
};

export const loadFeatureToggles = (
  featureToggles: FeatureTogglesResponse,
): FeatureTogglesSet => {
  return Object.entries(togglesDisctionary).reduce((acc, [key, toggles]) => {
    const isTurnOn = featureToggles[key as keyof FeatureTogglesResponse];

    const preparedToggles = toggles.reduce(
      (acc, toggle) => ({ ...acc, [toggle]: isTurnOn }),
      {},
    );

    return { ...acc, ...preparedToggles };
  }, {});
};
