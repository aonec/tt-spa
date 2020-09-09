import React, { useState, useEffect } from 'react';
import { Route, useParams } from 'react-router-dom';

import { Grid } from '01/_components';
import {
  getInfo,
  getObjectOfDevice,
  getODPUTasks,
  getRelatedDevices,
  getTypeODPU,
} from '01/_api/device_page';
import { Header } from './components/Header';
import { Tabs } from './components/Tabs';
import { TabsNotCalculator } from './components/TabsNotCalculator';

import { Information } from './components/Information';
import { Events } from './components/Events';
import { Connection } from './components/Connection';
import { ConnectionNotCalculator } from './components/ConnectionNotCalculator';

import { RelatedDevices } from './components/RelatedDevices';
import { RelatedDevicesNotCalculator } from './components/RelatedDevicesNotCalculator';

// import { Changes } from './components/Changes';
// import { Documents } from './components/Documents';

export const DeviceContext = React.createContext();

export const DeviceProfile = (props) => {
  const { 0: objid, 1: deviceId } = useParams();
  const [device, setDevice] = useState();
  const [building, setBuilding] = useState();
  const [tasks, setTasks] = useState();
  const [related, setRelated] = useState();
  const [typeODPU, setTypeODPU] = useState();
  const [mistake, setMistake] = useState();
  const [loadings, setLoadings] = useState({
    device: true,
    building: true,
    tasks: true,
    related: true,
    typeODPU: true,
  });

  const errors = {
    device: 'Произошла ошибка запроса устройства',
    building: 'Произошла ошибка при загрузке данных по зданию',
    tasks: 'Произошла ошибка при загрузке данных по задачам',
    related: 'Произошла ошибка при загрузке данных по подключенным устройствам',
    typeODPU: 'Произошла ошибка при загрузке данных по типу устройства',
  };

  useEffect(() => {
    Promise.all([
      getInfo(deviceId),
      // getInfo(111111111),
      getObjectOfDevice(objid),
      // getODPUTasks(deviceId),
      getRelatedDevices(deviceId),
      getTypeODPU(deviceId),
      // getTypeODPU('111111'),
    ])
      .then((responses) => {
        const [device, building, tasks, related, typeODPU] = responses;
        setDevice(device);
        setBuilding(building);
        setTasks(tasks.items);
        setRelated(related);
        setTypeODPU(typeODPU);
        setLoadings((prev) => ({ ...prev, device: false }));
        setLoadings((prev) => ({ ...prev, building: false }));
        setLoadings((prev) => ({ ...prev, tasks: false }));
        setLoadings((prev) => ({ ...prev, related: false }));
        setLoadings((prev) => ({ ...prev, typeODPU: false }));
      })
      .catch((error) => {});
  }, []);

  const path = `/objects/${objid}/devices/${deviceId}/`;

  const buttonHandler = () => {
    console.log('states', loadings);
    console.log('buttonHandler');
    console.log('path', path);
    console.log('deviceId', deviceId);
    console.log('typeODPU', typeODPU);
  };
  if (typeODPU === 'Calculator') {
    return (
      <DeviceContext.Provider
        value={{
          device,
          building,
          tasks,
          related,
          typeODPU,
          loadings,
          errors,
        }}
      >
        <Header />

        <Tabs />

        {/* Здесь делим экран на две части: main and aside */}
        <Grid>
          <Route path={path} exact>
            <Information />
          </Route>

          <Route path={`${path}connection`} exact>
            <Connection />
          </Route>

          <Route path={`${path}related`} exact>
            <RelatedDevices />
          </Route>

          <Route path={`${path}documents`} exact>
            <div>Документы</div>
          </Route>

          <Events title="Задачи с объектом" />
        </Grid>
        <button onClick={buttonHandler}>button</button>
      </DeviceContext.Provider>
    );
  }

  return (
    <DeviceContext.Provider
      value={{
        device,
        building,
        tasks,
        related,
        typeODPU,
        mistake,
      }}
    >
      <Header />

      <TabsNotCalculator />

      {/* Здесь делим экран на две части: main and aside */}
      <Grid>
        <Route path={path} exact>
          <Information />
        </Route>

        <Route path={`${path}related`} exact>
          <RelatedDevicesNotCalculator />
        </Route>

        <Route path={`${path}documents`} exact>
          <div>Документы</div>
        </Route>

        <Events title="Задачи с объектом" />
      </Grid>
      {/* <button onClick={buttonHandler}>button</button> */}
    </DeviceContext.Provider>
  );
};

export default DeviceProfile;
