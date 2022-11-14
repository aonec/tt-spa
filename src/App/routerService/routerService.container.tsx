import { $currentManagingFirmUser } from '01/features/managementFirmUsers/displayCurrentUser/models';
import { useStore } from 'effector-react';
import React from 'react';
import { Router } from './view/Router';

export const RouterContainer = () => {
  const current = useStore($currentManagingFirmUser);

  const roles = current?.roles;

  return <Router />;
};
