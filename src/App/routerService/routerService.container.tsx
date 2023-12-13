import React from 'react';
import { useUnit } from 'effector-react';
import { Router } from './view/Router';
import { routerService } from './routerService.model';
import { ESecuredIdentityRoleName } from 'api/types';
import { developmentSettingsService } from 'services/developmentSettings/developmentSettings.models';

const { outputs } = routerService;

export const RouterContainer = () => {
  const { featureToggles, currentUserRoles, isRolesLoadded } = useUnit({
    featureToggles: developmentSettingsService.outputs.$featureToggles,
    currentUserRoles: outputs.$currentUserRoles,
    isRolesLoadded: outputs.$isCurrentUserLoading,
  });

  const roles =
    currentUserRoles.reduce((acc, { key }) => {
      if (!key) {
        return acc;
      }
      return [...acc, key];
    }, [] as ESecuredIdentityRoleName[]) || [];

  return (
    <Router
      roles={roles}
      isRolesLoadded={isRolesLoadded}
      featureToggles={featureToggles}
    />
  );
};
