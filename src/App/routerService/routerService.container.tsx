import React from 'react';
import { useStore } from 'effector-react';
import { Router } from './view/Router';
import { routerService } from './routerService.model';

const { outputs } = routerService;

export const RouterContainer = () => {
  const currentUserRoles = useStore(outputs.$currentUserRoles);

  const roles = currentUserRoles?.map(({ key }) => key!) || [];

  return (
    <>
      <Router roles={roles} />
    </>
  );
};
