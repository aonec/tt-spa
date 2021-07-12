import React from 'react';
import { Route } from 'react-router-dom';
import { useFetchPage } from './hooks/useFetchPage';
import { useFilter } from './hooks/useFiter';
import { useApartments } from './hooks/useApartments';
import { useApartmentInfo } from './hooks/useApartmentInfo';
import { useMeterDevices } from './hooks/useMeterDevices';

import { Apartments } from './components/Apartments';
import { Filter } from './components/Filter';
import { ApartmentInfo } from './components/ApartmentInfo';
import { ApartmentReadings } from './components/MeterDevices/ApartmentReadings';
import Houses from './components/HousesReadings/HousesReadings';
import { Tabs } from 'antd';
import { useHistory } from 'react-router-dom';
import HouseReadings from './components/HousesReadings/HousesDevices/HousesDevices';
import { Title } from '../../_components/Headers';

const { TabPane } = Tabs;

export const MetersPage = () => {
  const [state, dispatch] = React.useReducer(reducer, {});
  useFetchPage(state, dispatch);
  const filter = useFilter(dispatch);
  const aparts = useApartments(state, filter);
  const apartInfo = useApartmentInfo(state);
  const meterDev = useMeterDevices(state);

  const history = useHistory();
  const defaultKey = history.location.pathname.split('/')[2];

  const handleTabClick = (key) => {
    history.replace(`/meters/${key}`); // < == router router v4
  };

  return (
    <div style={{ maxWidth: 960 }}>
      <Title style={{ marginBottom: 16 }}>Ввод показаний</Title>
      <Tabs defaultActiveKey={defaultKey} onChange={handleTabClick}>
        <TabPane tab="По квартирам" key="apartments">
          <Route path="/meters">
            <Filter {...filter} />
          </Route>
          <Route path="/meters/apartments" exact>
            <Apartments {...aparts} />
          </Route>
          <Route path="/meters/apartments/:id">
            <ApartmentInfo {...apartInfo} />
            <ApartmentReadings {...meterDev} />
          </Route>
        </TabPane>
        <TabPane tab="По домам" key="houses">
          <Route path="/*/houses" exact>
            <Houses />
          </Route>
          <Route path="/*/houses/:id">
            <HouseReadings />
          </Route>
        </TabPane>
      </Tabs>
    </div>
  );
};

function reducer(state, action) {
  const { type, params, data } = action;
  switch (type) {
    case 'success':
      return { ...state, ...data };
    case 'get_apartments':
      return { ...state, params, apartments: { loading: true } };

    default:
      console.error('meters', type);
      return state;
  }
}
