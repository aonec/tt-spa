import { ESecuredIdentityRoleName } from 'api/types';
import { ReactNode } from 'react';
import { FeatureToggles } from 'services/developmentSettings/developmentSettings.types';

export type RouterProps = {
  roles: ESecuredIdentityRoleName[];
  isRolesLoadded: boolean;
  featureToggles: FeatureToggles;
};

export type PermittedRouteProps = {
  permissionList: boolean[];
  children: ReactNode;
};
