import React from 'react';
import { useStore } from 'effector-react';
import { Router } from './view/Router';
import { routerService } from './routerService.model';

const { outputs } = routerService;

export const RouterContainer = () => {
  const currentUser = useStore(outputs.$currentUser);

  const roles = currentUser?.roles?.map(({ key }) => key!) || [];

  return <Router roles={roles} />;
};
