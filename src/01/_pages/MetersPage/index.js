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
import { AccountingNodesFilter } from '01/features/readings/accountingNodesReadings/components/Filter';

const { TabPane } = Tabs;

export const MetersPage = () => {
  const history = useHistory();
  const defaultKey = history.location.pathname.split('/')[2];

  const handleTabClick = (key) => {
    history.replace(`/meters/${key}`);
  };

  return (
    <Wrap style={{ maxWidth: 960 }}>
      <Tabs defaultActiveKey={defaultKey} onChange={handleTabClick}>
        <TabPane tab="По квартирам" key="apartments">
          <Route path="/meters/apartments">
            <Filter />
          </Route>
          <Route path="/meters/apartments/:id">
            <ApartmentInfo />
            <ApartmentReadings />
          </Route>
        </TabPane>
        <TabPane tab="По домам" key="houses">
          <Route path="/meters/houses">
            <HousingStockFilter />
          </Route>
          <Route path="/meters/houses/:id">
            <HouseReadings />
          </Route>
        </TabPane>
        <TabPane tab="По узлам учета" key="accountingNodes">
          <Route path="/meters/accountingNodes">
            <AccountingNodesFilter />
          </Route>
          <Route path="/meters/accountingNodes/:id">
            <ApartmentInfo />
            <ApartmentReadings />
          </Route>
        </TabPane>
      </Tabs>
    </Wrap>
  );
};

const Wrap = styled.div`
  .ant-tabs {
    overflow: visible !important;
  }
`;
