import React from 'react';
import { Route } from 'react-router-dom';
import {
  DistrictBordersByAddressContainer,
  districtBordersByAddressService,
} from './districtBordersByAddressService';
import { EditDistrictBordersContainer } from './editDistrictBordersService';
import { CreateDistrictBorderMapContainer } from './createDistrictBorderMapService';
import { ManageDistrictsMapContainer } from './manageDistrictsMapService';
import { usePermission } from 'hooks/usePermission';
import { ESecuredIdentityRoleName } from 'api/types';

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

  return [
    <Route path="/districtBordersSettings">
      <DistrictBordersGroupPageGate />
      {(isSeniorOperator || isOperator) && (
        <Route
          path="/districtBordersSettings/createByHousingStocksList"
          component={DistrictBordersByAddressContainer}
          exact
        />
      )}
      {(isSeniorOperator || isOperator) && (
        <Route
          path="/districtBordersSettings/editDistrictBorders/:id"
          component={EditDistrictBordersContainer}
          exact
        />
      )}
      {(isSeniorOperator || isAdministrator) && (
        <Route
          path="/districtBordersSettings/createByMap"
          component={CreateDistrictBorderMapContainer}
          exact
        />
      )}
      {(isSeniorOperator || isAdministrator) && (
        <Route
          path="/districtBordersSettings/manageDistricts"
          component={ManageDistrictsMapContainer}
          exact
        />
      )}
    </Route>,
  ];
};
