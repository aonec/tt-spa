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
    <Route path="/districtBordersSettings" key="/districtBordersSettings">
      <DistrictBordersGroupPageGate />
      {(isSeniorOperator || isOperator) && (
        <Route
          path="/districtBordersSettings/createByHousingStocksList"
          element={<DistrictBordersByAddressContainer />}
        />
      )}
      {(isSeniorOperator || isOperator) && (
        <Route
          path="/districtBordersSettings/editDistrictBorders/:id"
          element={<EditDistrictBordersContainer />}
        />
      )}
      {(isSeniorOperator || isAdministrator) && (
        <Route
          path="/districtBordersSettings/createByMap"
          element={<CreateDistrictBorderMapContainer />}
        />
      )}
      {(isSeniorOperator || isAdministrator) && (
        <Route
          path="/districtBordersSettings/manageDistricts"
          element={<ManageDistrictsMapContainer />}
        />
      )}
    </Route>,
  ];
};
