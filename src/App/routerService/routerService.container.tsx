import React from 'react';
import { useStore } from 'effector-react';
import { Router } from './view/Router';
import { routerService } from './routerService.model';
import { ESecuredIdentityRoleName } from 'myApi';

const { outputs } = routerService;

export const RouterContainer = () => {
  const currentUserRoles = useStore(outputs.$currentUserRoles);

  const isRolesLoadded = useStore(outputs.$isCurrentUserLoading);

  const roles =
    currentUserRoles.reduce((acc, { key }) => {
      if (!key) {
        return acc;
      }
      return [...acc, key];
    }, [] as ESecuredIdentityRoleName[]) || [];

  return <Router roles={roles} isRolesLoadded={isRolesLoadded} />;
};
