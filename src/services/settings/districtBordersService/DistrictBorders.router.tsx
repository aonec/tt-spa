import React from 'react';
import { Outlet, Route } from 'react-router-dom';
import {
  DistrictBordersByAddressContainer,
  districtBordersByAddressService,
} from './districtBordersByAddressService';
import { EditDistrictBordersContainer } from './editDistrictBordersService';
import { CreateDistrictBorderMapContainer } from './createDistrictBorderMapService';
import { ManageDistrictsMapContainer } from './manageDistrictsMapService';
import { usePermission } from 'hooks/usePermission';
import { ESecuredIdentityRoleName } from 'api/types';
import { AccessDeniedPage } from 'services/authorizations/AccessDeniedPage';

const { DistrictBordersGroupPageGate } = districtBordersByAddressService.gates;

export const DistrictBordersRouter = () => {
  const isOperator = usePermission([ESecuredIdentityRoleName.Operator]);
  const isSeniorOperator = usePermission([
    ESecuredIdentityRoleName.SeniorOperator,
  ]);
  const isAdministrator = usePermission([
    ESecuredIdentityRoleName.Administrator,
    ESecuredIdentityRoleName.ManagingFirmSpectatingAdministrator,
  ]);

  const DistrictBordersRouterWrapper = () => {
    return (
      <>
        <DistrictBordersGroupPageGate />
        <Outlet />
      </>
    );
  };

  return [
    <Route
      path="/districtBordersSettings"
      key="/districtBordersSettings"
      element={<DistrictBordersRouterWrapper />}
    >
      <Route
        path="/districtBordersSettings/createByHousingStocksList"
        element={
          isSeniorOperator || isOperator ? (
            <DistrictBordersByAddressContainer />
          ) : (
            <AccessDeniedPage />
          )
        }
      />
      <Route
        path="/districtBordersSettings/editDistrictBorders/:id"
        element={
          isSeniorOperator || isOperator ? (
            <EditDistrictBordersContainer />
          ) : (
            <AccessDeniedPage />
          )
        }
      />
      <Route
        path="/districtBordersSettings/createByMap"
        element={
          isSeniorOperator || isAdministrator ? (
            <CreateDistrictBorderMapContainer />
          ) : (
            <AccessDeniedPage />
          )
        }
      />
      <Route
        path="/districtBordersSettings/manageDistricts"
        element={
          isSeniorOperator || isAdministrator ? (
            <ManageDistrictsMapContainer />
          ) : (
            <AccessDeniedPage />
          )
        }
      />
    </Route>,
  ];
};
