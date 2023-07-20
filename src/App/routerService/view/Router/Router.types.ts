import { ESecuredIdentityRoleName } from 'api/myApi';
import { FeatureToggles } from 'services/developmentSettings/developmentSettings.types';

export type RouterProps = {
  roles: ESecuredIdentityRoleName[];
  isRolesLoadded: boolean;
  featureToggles: FeatureToggles;
};
