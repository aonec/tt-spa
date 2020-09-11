import React, { useState, useEffect } from 'react';
import { Route, useParams } from 'react-router-dom';
import _ from 'lodash';
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
import {Popup} from './components/Modal'
import { RelatedDevices } from './components/RelatedDevices';
import { RelatedDevicesNotCalculator } from './components/RelatedDevicesNotCalculator';
import $ from "jquery";

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
  const [loadings, setLoadings] = useState({
    device: true,
    building: true,
    tasks: true,
    related: true,
    typeODPU: true,
  });

  const [error, setError] = useState();

  const errorsTemplate = {
    device: 'Произошла ошибка запроса устройства',
    building: 'Произошла ошибка при загрузке данных по зданию',
    tasks: 'Произошла ошибка при загрузке данных по задачам',
    related: 'Произошла ошибка при загрузке данных по подключенным устройствам',
    typeODPU: 'Произошла ошибка при загрузке данных по типу устройства',
  };

  $(document).mouseup(function (e) {
    console.log("mouseup")
    var container = $('ul');
    if (container.has(e.target).length === 0){
      container.hide();
    }

    // var container2 = $('.overlay');
    // if (container2.has(e.target).length === 0){
    //   container2.hide();
    // }
  });

  const [errors, setErrors] = useState();

  useEffect(() => {
    Promise.all([
      getInfo(deviceId),
      getObjectOfDevice(objid),
      getODPUTasks(deviceId),
      getRelatedDevices(deviceId),
      getTypeODPU(deviceId),
    ])
      .then((responses) => {
        const [device, building, tasks, related, typeODPU] = responses;
        setDevice(device);
        setBuilding(building);
        setTasks(tasks.items);
        setRelated(related);
        setTypeODPU(typeODPU);
      })
      .catch(({ resource, message }) => {
        const text = errorsTemplate[resource];
        setError({ resource, text });
      })
      .finally(() => {
        setLoadings((prev) => ({ ...prev, device: false }));
        setLoadings((prev) => ({ ...prev, building: false }));
        setLoadings((prev) => ({ ...prev, tasks: false }));
        setLoadings((prev) => ({ ...prev, related: false }));
        setLoadings((prev) => ({ ...prev, typeODPU: false }));
      });
  }, []);
  const showInfo = () => {
    console.log(device)
  }
  const path = `/objects/${objid}/devices/${deviceId}/`;

  const buttonHandler = () => {
    console.log('error', error);
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
          error,
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
        <Popup />
        {/*<button onClick={showPopupHandler}>showPopup</button>*/}
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
        loadings,
        errors,
        error,
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
    </DeviceContext.Provider>
  );
};

export default DeviceProfile;
