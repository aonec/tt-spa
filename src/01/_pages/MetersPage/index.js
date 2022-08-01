/* eslint-disable */

import React from 'react';
import { Route } from 'react-router-dom';
import { ApartmentInfo } from './components/ApartmentInfo';
import { ApartmentReadings } from './components/MeterDevices/ApartmentReadings';
import HouseReadings from './components/HousesReadings/HousesDevices/HousesDevices';
import styled from 'styled-components';
import { FilterContainer } from './components/Filter.container';
import { HousingStockFilter } from '../../features/housingStocks/displayHousingStocks/components/HousingStockFilter/HousingStockFilter';
import { AccountingNodesReadings } from '../../features/readings/accountingNodesReadings';
import { CurrentManagingFirmUserGate } from '../../features/managementFirmUsers/displayCurrentUser/models';

export const MetersPage = () => {
  return (
    <Wrap>
      <CurrentManagingFirmUserGate />
      <Route path="/meters/apartments/:id?">
        <FilterContainer />
      </Route>

      <Route path="/meters/apartments/:id">
        <ApartmentInfo />
        <ApartmentReadings />
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
