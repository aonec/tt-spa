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
import { Connection } from './components/Connection';

export const DeviceContext = React.createContext();

export const DeviceProfile = (props) => {
  const { 0: objid, 1: deviceId } = useParams();
  const [device, setDevice] = useState();
  const [building, setBuilding] = useState();
  const [tasks, setTasks] = useState();

  useEffect(() => {
    getInfo(deviceId).then((response) => setDevice(response));
    getObjectOfDevice(objid).then((response) => setBuilding(response));
    getODPUTasks(deviceId).then((response) => setTasks(response));
  }, []);

  const buttonHandler = () => {
    console.log('device', device);
    console.log('building', building);
  };

  return styled(grid)(
    <>
      <DeviceContext.Provider value={{ device, building, tasks }}>
        {/* <button onClick={buttonHandler}>button</button> */}
        <Header />
        <Tabs />
        <grid>
          <Route path="/*/(\\d+)" exact>
            <Information />
            <Events title="Задачи с объектом" />
          </Route>
          {/* <Route
                  path="/objects/(\\d+)/devices/(\\d+)/(testimony|documents|changes)?"
                  component={DeviceProfile}
                  exact
                /> */}
        </grid>
        <Route path="/*/(\\d+)/documents" exact>
          <Documents />
        </Route>

        <Route path="/*/(\\d+)/testimony" exact>
          <History />
        </Route>

        <Route path="/*/(\\d+)/changes" exact>
          <Changes />
        </Route>
      </DeviceContext.Provider>
    </>,
  );
};

export default DeviceProfile;
