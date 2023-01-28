 

import React from 'react';
import { Route } from 'react-router-dom';
import { ApartmentInfo } from './components/ApartmentInfo';
import HouseReadings from './components/HousesReadings/HousesDevices/HousesDevices';
import { HousingStockFilter } from '01/features/housingStocks/displayHousingStocks/components/HousingStockFilter/HousingStockFilter';
import styled from 'styled-components';
import { AccountingNodesReadings } from '01/features/readings/accountingNodesReadings';
import { CurrentManagingFirmUserGate } from '01/features/managementFirmUsers/displayCurrentUser/models';
import { FilterContainer } from './components/Filter.container';
import { ApartmentIndividualDevicesMetersContainer } from 'services/meters/apartmentIndividualDevicesMetersService';

export const MetersPage = () => {
  return (
    <Wrap>
      <CurrentManagingFirmUserGate />
      <Route path="/meters/apartments/:id?">
        <FilterContainer />
      </Route>

      <Route path="/meters/apartments/:id">
        <ApartmentInfo />
        <ApartmentIndividualDevicesMetersContainer />
      </Route>

      <Route path="/meters/houses">
        <HousingStockFilter />
      </Route>

      <Route path="/meters/houses/:id">
        <HouseReadings />
      </Route>

      <Route path="/meters/accountingNodes">
        <AccountingNodesReadings />
      </Route>
    </Wrap>
  );
};

const Wrap = styled.div`
  max-width: 960px;

  .ant-tabs {
    overflow: visible !important;
  }
`;
