import React from 'react';
import { Route } from 'react-router-dom';
import { Apartments } from './components/Apartments';
import { Filter } from './components/Filter';
import { ApartmentInfo } from './components/ApartmentInfo';
import { ApartmentReadings } from './components/MeterDevices/ApartmentReadings';
import { Tabs } from 'antd';
import { useHistory } from 'react-router-dom';
import HouseReadings from './components/HousesReadings/HousesDevices/HousesDevices';
import { Title } from '../../_components/Headers';
import { HousingStocks } from '01/features/housingStocks/displayHousingStocks';
import { HousingStockFilter } from '01/features/housingStocks/displayHousingStocks/components/HousingStockFilter/HousingStockFilter';
import styled from 'styled-components';

const { TabPane } = Tabs;

export const MetersPage = () => {
  const history = useHistory();
  const defaultKey = history.location.pathname.split('/')[2];

  const handleTabClick = (key) => {
    history.replace(`/meters/${key}`);
  };

  return (
    <Wrap style={{ maxWidth: 960 }}>
      <Title style={{ marginBottom: 16 }}>Ввод показаний</Title>
      <Tabs defaultActiveKey={defaultKey} onChange={handleTabClick}>
        <TabPane tab="По квартирам" key="apartments">
          <Route path="/meters/apartments">
            <Filter />
          </Route>
          <Route path="/meters/apartments" exact>
            <Apartments />
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
          <Route path="/meters/houses" exact>
            <HousingStocks />
          </Route>
          <Route path="/meters/houses/:id">
            <HouseReadings />
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

function reducer(state, action) {
  const { type, params, data } = action;
  switch (type) {
    case 'success':
      return { ...state, ...data };
    case 'get_apartments':
      return { ...state, params, apartments: { loading: true } };
    case 'clear_apartInfo':
      return {
        ...state,
        meterDevices: undefined,
        apartInfo: undefined,
      };

    default:
      console.error('meters', type);
      return state;
  }
}
