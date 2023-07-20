import React from 'react';
import { useStore, useUnit } from 'effector-react';
import { Router } from './view/Router';
import { routerService } from './routerService.model';
import { ESecuredIdentityRoleName } from 'api/myApi';
import { developmentSettingsService } from 'services/developmentSettings/developmentSettings.models';

const { outputs } = routerService;

export const RouterContainer = () => {
  const { featureToggles } = useUnit({
    featureToggles: developmentSettingsService.outputs.$featureToggles,
  });

  const currentUserRoles = useStore(outputs.$currentUserRoles);

  const isRolesLoadded = useStore(outputs.$isCurrentUserLoading);

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
