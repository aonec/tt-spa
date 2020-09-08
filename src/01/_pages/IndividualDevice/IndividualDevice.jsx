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

// import { Changes } from './components/Changes';
// import { Documents } from './components/Documents';
// import { Connection } from './components/Connection';
// import { RelatedDevices } from './components/RelatedDevices';

export const DeviceContext = React.createContext();

export const IndividualDevice = (props) => {
  const { 0: objid, 1: apartmentId, 2: deviceId } = useParams();
  const [device, setDevice] = useState();
  const [building, setBuilding] = useState();
  const [tasks, setTasks] = useState();
  const [related, setRelated] = useState();
  const [mistake, setMistake] = useState();

  useEffect(() => {
    // getInfo(deviceId).then((response) => setDevice(response));
    // getObjectOfDevice(objid).then((response) => setBuilding(response));
    // getODPUTasks(deviceId).then((response) => setTasks(response));
    // getRelatedDevices(deviceId).then((response) => setRelated(response));

    Promise.all([
      getInfo(deviceId),
      //getInfo(111111111),
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
      setMistake(error)
    });
  }, []);

  const path = `/objects/${objid}/apartments/${apartmentId}/devices/${deviceId}/`;

  const buttonHandler = () => {
    console.log('buttonHandler');
    console.log('path', path);
  };

  return (
    <>
      <DeviceContext.Provider
        value={{
          device,
          building,
          tasks,
          mistake
          // related,
        }}
      >

        <Header/>
        <Tabs/>

        {/* Здесь делим экран на две части: main and aside */}
        <Grid>
          <Route path={path} exact>
            <Information/>
          </Route>

          <Route path={`${path}connection`} exact>
            <div>Настройки подключения</div>
          </Route>

          <Route path={`${path}documents`} exact>
            <div>Документы</div>
          </Route>

          <Events title="Задачи с объектом"/>
        </Grid>
        {/* <button onClick={buttonHandler}>button</button> */}
      </DeviceContext.Provider>
    </>
  );
};

export default IndividualDevice;
