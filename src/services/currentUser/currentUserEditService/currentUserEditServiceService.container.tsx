import React from 'react';
import { currentUserEditServiceService } from './currentUserEditServiceService.models';
import { EditUser } from './EditUser';

const { inputs, outputs } = currentUserEditServiceService;

export const CurrentUserEditServiceContainer = () => {
  return <EditUser />;
};
