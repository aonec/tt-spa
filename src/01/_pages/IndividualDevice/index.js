import React, { useState, useEffect } from 'react';
import { Route, useParams } from 'react-router-dom';
import { Grid } from '01/_components';
import {
  getInfo,
  getObjectOfDevice,
  getODPUTasks,
  getRelatedDevices,
} from '01/_api/individual_device_page';
import { Header } from './components/Header';
import { Tabs } from './components/Tabs';
import { Information } from './components/Information';
import { Events } from './components/Events';

export const DeviceContext = React.createContext();

export const IndividualDevice = () => {
  const { 0: objid, 1: apartmentId, 2: deviceId } = useParams();
  const [device, setDevice] = useState();
  const [building, setBuilding] = useState();
  const [tasks, setTasks] = useState();
  const [related, setRelated] = useState();
  const [mistake, setMistake] = useState();

  useEffect(() => {
    Promise.all([
      getInfo(deviceId),
      getObjectOfDevice(objid),
      getODPUTasks(deviceId),
      getRelatedDevices(deviceId),
    ]).then((responses) => {
      // console.log(responses);
      const [device, building, tasks, related] = responses;
      setDevice(device);
      setBuilding(building);
      setTasks(tasks);
      setRelated(related);
    }).catch((error) => {
      setMistake(error);
    });
  }, []);

  const path = `/objects/${objid}/apartments/${apartmentId}/devices/${deviceId}/`;

  return (
    <>
      <DeviceContext.Provider
        value={{
          device,
          building,
          tasks,
          mistake,
        }}
      >

        <Header />
        <Tabs />

        {/* Здесь делим экран на две части: main and aside */}
        <Grid>
          <Route path={path} exact>
            <Information />
          </Route>

          <Route path={`${path}readings`} exact>
            <div>История показаний</div>
          </Route>

          <Route path={`${path}documents`} exact>
            <div>Документы</div>
          </Route>

          <Route path={`${path}changes`} exact>
            <div>История изменений</div>
          </Route>

          <Events title="Задачи с объектом" />
        </Grid>
      </DeviceContext.Provider>
    </>
  );
};

export default IndividualDevice;
