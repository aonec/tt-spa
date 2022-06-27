/* eslint-disable */

import React from 'react';
import { Route } from 'react-router-dom';
import { Filter } from './components/Filter';
import { ApartmentInfo } from './components/ApartmentInfo';
import { ApartmentReadings } from './components/MeterDevices/ApartmentReadings';
import { Tabs } from 'antd';
import { useHistory } from 'react-router-dom';
import HouseReadings from './components/HousesReadings/HousesDevices/HousesDevices';
import { HousingStockFilter } from '01/features/housingStocks/displayHousingStocks/components/HousingStockFilter/HousingStockFilter';
import styled from 'styled-components';
import { AccountingNodesReadings } from '01/features/readings/accountingNodesReadings';
import { CurrentManagingFirmUserGate } from '01/features/managementFirmUsers/displayCurrentUser/models';

const { TabPane } = Tabs;

export const MetersPage = () => {
  const history = useHistory();
  const key = history.location.pathname.split('/')[2];

  const handleTabClick = (key) => {
    history.push(`/meters/${key}`);
  };

  return (
    <Wrap style={{ maxWidth: 960 }}>
      <CurrentManagingFirmUserGate />
      <Route path="/meters/apartments">
        <Filter />
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
  .ant-tabs {
    overflow: visible !important;
  }
`;
