import React from 'react';
import { useStore } from 'effector-react';
import { Router } from './view/Router';
import { routerService } from './routerService.model';
import { useLocation } from 'react-router-dom';

const { outputs } = routerService;

export const RouterContainer = () => {
  const currentUser = useStore(outputs.$currentManagingFirmUser);

  const roles = currentUser?.roles?.map(({ key }) => key!) || [];

  const { pathname } = useLocation();

  const isMapPage = pathname.split('/').includes('map');

  return <Router roles={roles} isMapPage={isMapPage} />;
};
