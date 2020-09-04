import React, { useState, useEffect, useContext } from 'react';
import styled from 'reshadow/macro';

import {
  Route, useRouteMatch, useParams, useHistory,
} from 'react-router-dom';
import { grid } from '01/r_comp';
import {
  getInfo,
  getObjectOfDevice,
  getODPUTasks,
  getRelatedDevices,
} from '01/_api/device_page';
import { ListWrap, Title, ListItem } from '01/_components/List';
import { Header } from './components/Header';
import { Tabs } from './components/Tabs';
import { Information } from './components/Information';
import { Events } from './components/Events';
import { Changes } from './components/Changes';
import { Documents } from './components/Documents';
import { Connection } from './components/Connection';
import { RelatedDevices } from './components/RelatedDevices';

export const DeviceContext = React.createContext();

export const DeviceProfile = (props) => {
  const { 0: objid, 1: deviceId } = useParams();
  const [device, setDevice] = useState();
  const [building, setBuilding] = useState();
  const [tasks, setTasks] = useState();
  const [related, setRelated] = useState();

  useEffect(() => {
    getInfo(deviceId).then((response) => setDevice(response));
    getObjectOfDevice(objid).then((response) => setBuilding(response));
    getODPUTasks(deviceId).then((response) => setTasks(response));
    getRelatedDevices(deviceId).then((response) => setRelated(response));
  }, []);

  const buttonHandler = () => {
    console.log('device', device);
    console.log('building', building);
  };

  console.log('getRelatedDevices', related);

  return styled(grid)(
    <>
      <DeviceContext.Provider value={{
        device, building, tasks, related,
      }}
      >
        {/* <button onClick={buttonHandler}>button</button> */}
        <Header />
        <Tabs />

        <Route path="/*/(\\d+)" exact>
          <grid>
            <Information />
            <Events title="Задачи с объектом" />
          </grid>
        </Route>
        {/* <Route
                  path="/objects/(\\d+)/devices/(\\d+)/(testimony|documents|changes)?"
                  component={DeviceProfile}
                  exact
                /> */}

        <Route path="/*/(\\d+)/connection" exact>
          <grid>
            <Connection />
            <Events title="Задачи с объектом" />
          </grid>
        </Route>

        <Route path="/*/(\\d+)/related" exact>
          <RelatedDevices />
        </Route>

        <Route path="/*/(\\d+)/changes" exact>
          <Changes />
        </Route>
      </DeviceContext.Provider>
    </>,
  );
};

export default DeviceProfile;
