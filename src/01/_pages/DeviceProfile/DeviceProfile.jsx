import React, { useState, useEffect, useContext } from 'react';
import styled from 'reshadow/macro';

import {
  Route, useRouteMatch, useParams, useHistory,
} from 'react-router-dom';
import { grid } from '01/r_comp';
import { getInfo, getObjectOfDevice, getODPUTasks } from '01/_api/device_page';
import { Header } from './components/Header';
import { Tabs } from './components/Tabs';
import { Information } from './components/Information';
import { History } from './components/History';
import { Events } from './components/Events';
import { Changes } from './components/Changes';
import { Documents } from './components/Documents';

import { useObjectInformation, useFetchPage, useDeviceChanges } from './hooks';

function reducer(state, action) {
  const { type, data } = action;
  switch (type) {
    case 'success':
      return { ...state, ...data };
    default:
      console.error('objid', type);
      return state;
  }
}

export const DeviceContext = React.createContext();

export const DeviceProfile = (props) => {

  const [state, dispatch] = React.useReducer(reducer, {});
  useFetchPage(state, dispatch);
  const { push } = useHistory();
  const info = useObjectInformation(state);
  const changes = useDeviceChanges(state);
  const { header = [], events = [], aparts = [] } = state;


  const { 0: objid, 1: deviceId } = useParams();
  const [device, setDevice] = useState();
  const [building, setBuilding] = useState();
  const [tasks, setTasks] = useState();

  useEffect(() => {
    getInfo(deviceId).then((response) => setDevice(response));
    getObjectOfDevice(objid).then((response) => setBuilding(response));
    getODPUTasks(objid).then((response) => setTasks(response));
  }, []);

  const buttonHandler = () => {
    console.log('deviceId', deviceId);
    console.log('device', device)
    console.log('objid', objid)
    console.log('building', building)
  };

  const { city, street, number } = { ...building };
  const address = { city, street, number };

  return styled(grid)(
    <>
      <DeviceContext.Provider value={{device,building}}>
         {/*<button onClick={buttonHandler}>button</button>*/}
        <Header />
        <Tabs />
        <grid>
          <Route path="/*/(\\d+)" exact>
            <Information {...info} />
            {/* <Events title="Задачи с объектом" {...events} /> */}
          </Route>
          {/* <Route
                  path="/objects/(\\d+)/devices/(\\d+)/(testimony|documents|changes)?"
                  component={DeviceProfile}
                  exact
                /> */}
        </grid>
        <Route path="/*/(\\d+)/documents" exact>
          <Documents {...info} />
        </Route>

        <Route path="/*/(\\d+)/testimony" exact>
          <History {...info} />
        </Route>

        <Route path="/*/(\\d+)/changes" exact>
          <Changes {...info} />
        </Route>
      </DeviceContext.Provider>
    </>,
  );
};

export default DeviceProfile;
