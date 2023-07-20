import { ESecuredIdentityRoleName } from 'myApi';
import { FeatureToggles } from 'services/developmentSettings/developmentSettings.types';

export type RouterProps = {
  roles: ESecuredIdentityRoleName[];
  isRolesLoadded: boolean;
  featureToggles: FeatureToggles;
};
