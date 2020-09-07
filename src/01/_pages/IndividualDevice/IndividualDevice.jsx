import React, { useState, useEffect } from 'react';

import { Route, useParams } from 'react-router-dom';
import { grid } from '01/r_comp';
import styled from 'styled-components';
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
// import { Changes } from './components/Changes';
// import { Documents } from './components/Documents';
// import { Connection } from './components/Connection';
// import { RelatedDevices } from './components/RelatedDevices';

const Grid = styled.div`
display: grid;
grid-template-columns: 8fr 5fr;
grid-gap: 16px;
align-content: start;
`

export const DeviceContext = React.createContext();

export const IndividualDevice = (props) => {
  const { 0: objid, 1: apartmentId, 2: deviceId } = useParams();
  const [device, setDevice] = useState();
  const [building, setBuilding] = useState();
  const [tasks, setTasks] = useState();
  const [related, setRelated] = useState();
  console.log(objid, apartmentId, deviceId);
  useEffect(() => {
    getInfo(deviceId).then((response) => setDevice(response));
    getObjectOfDevice(objid).then((response) => setBuilding(response));
    getODPUTasks(deviceId).then((response) => setTasks(response));
    // getRelatedDevices(deviceId).then((response) => setRelated(response));

    // console.log('tasks', tasks);
    // console.log('related', related);
  }, []);

  const buttonHandler = () => {
    console.log('buttonHandler');
    console.log('device', device);
    console.log('building', building);
  };

  console.log('getRelatedDevices', related);

  return (
    <>
      <DeviceContext.Provider
        value={{
          device,
          building,
          tasks,
          // related,
        }}
      >
        <button onClick={buttonHandler}>button</button>
        <Header />
        <Tabs />

        <Route path="/">
          <Grid>
            <Information />
            <Events title="Задачи с объектом" />
            </Grid>
        </Route>

        <Route path="/*/(\\d+)/" exact>
          <grid>
            {/* <Information /> */}
            {/* <Events title="Задачи с объектом" /> */}
          </grid>
        </Route>
      </DeviceContext.Provider>
    </>
  );
};

export default IndividualDevice;

// import React from 'react';

// export const IndividualDevice = () => {
//   console.log('test');
//   return <div>test</div>;
// };

// export default IndividualDevice;
