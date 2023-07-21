import { ESecuredIdentityRoleName } from 'api/types';
import { FeatureToggles } from 'services/developmentSettings/developmentSettings.types';

export type RouterProps = {
  roles: ESecuredIdentityRoleName[];
  isRolesLoadded: boolean;
  featureToggles: FeatureToggles;
};
