import React, { FC } from 'react';
import { PermittedRouteProps } from './Router.types';
import { Route } from 'react-router-dom';
import { AccessDeniedPage } from 'services/authorizations/AccessDeniedPage';

export const PermittedRoute: FC<PermittedRouteProps> = ({
  permissionList,
  children,
}) => {
  const isPermitted = permissionList.includes(true);

  return (
    <>
      {isPermitted ? (
        children
      ) : (
        <Route path="/buildings/create" element={<AccessDeniedPage />} />
      )}
    </>
  );
};
