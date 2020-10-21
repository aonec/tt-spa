import React, { useState, useEffect } from 'react';
import { Route, useParams } from 'react-router-dom';
import { Grid } from '01/_components';
import {
  getInfo,
  getObjectOfDevice,
  getODPUTasks,
  getRelatedDevices,
  getTypeODPU,
  getCalculatorResources,
  getCalculator,
  getPagination,
} from '01/_api/device_page';
import { Header } from './components/Header';
import { Tabs } from './components/Tabs';
import { TabsNotCalculator } from './components/TabsNotCalculator';
import { Information } from './components/Information';
import { InformationNotCalculator } from './components/InformationNotCalculator';
import { Events } from './components/Events';
import { Connection } from './components/Connection';
import { ConnectionNotCalculator } from './components/ConnectionNotCalculator';
import { ModalODPU } from './components/Modals/Modal';
import ModalDeregisterDevice from './components/Modals/ModalDeregisterDevice';
import { RelatedDevices } from './components/RelatedDevices';
import { RelatedDevicesNotCalculator } from './components/RelatedDevicesNotCalculator';
import { HeaderNotCalculator } from './components/HeaderNotCalculator';

export const DeviceContext = React.createContext();

export const DeviceProfile = () => {
  const { 0: objid, 1: deviceId } = useParams();
  const [device, setDevice] = useState();
  const [building, setBuilding] = useState();
  const [tasks, setTasks] = useState();
  const [related, setRelated] = useState();
  const [typeODPU, setTypeODPU] = useState();
  const [hubs, setHubs] = useState();
  const [calcModel, setCalcModel] = useState();

  const [error, setError] = useState();
  const [errors, setErrors] = useState();

  const [loadings, setLoadings] = useState({
    device: true,
    building: true,
    tasks: true,
    related: true,
    typeODPU: true,
  });
  const errorsTemplate = {
    device: 'Произошла ошибка запроса устройства',
    building: 'Произошла ошибка при загрузке данных по зданию',
    tasks: 'Произошла ошибка при загрузке данных по задачам',
    related: 'Произошла ошибка при загрузке данных по подключенным устройствам',
    typeODPU: 'Произошла ошибка при загрузке данных по типу устройства',
    calculator: 'Произошла ошибка при загрузке ресурсов вычислителя',
  };

  useEffect(() => {
    Promise.all([
      getInfo(deviceId),
      getObjectOfDevice(objid),
      getODPUTasks(deviceId),
      getRelatedDevices(deviceId),
      getTypeODPU(deviceId),
      // getCalculatorResources(deviceId),
    ])
      .then((responses) => {
        const [device, building, tasks, related, typeODPU] = responses;
        setDevice(device);
        setBuilding(building);
        setTasks(tasks.items);
        setRelated(related);
        setTypeODPU(typeODPU);
        console.log('device', device);
        // setHubs(hubs);
      })
      .catch(({ resource, message }) => {
        const text = errorsTemplate[resource];
        setError({ resource, text });
      })
      .finally(() => {
        setLoadings((prev) => ({
          ...prev,
          device: false,
          building: false,
          tasks: false,
          related: false,
          typeODPU: false,
        }));
      });
  }, []);

  useEffect(() => {
    if (typeODPU === 'Calculator') {
      getCalculatorResources(deviceId).then((response) => {
        setHubs(response);
      });
      getCalculator(deviceId).then((response) => {
        setCalcModel(response);
        console.log('calcModel', response);
      });
      console.log('calcModel= ', calcModel);
    }
  }, [typeODPU]);

  const path = `/objects/${objid}/devices/${deviceId}/`;

  const buttonHandler = () => {
    console.log('calculator');
    getPagination();
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
          hubs,
          calcModel,
        }}
      >
        <Header />
        <Tabs />
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
        <ModalODPU />
        <ModalDeregisterDevice />
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
        hubs,
        calcModel,
      }}
    >
      <HeaderNotCalculator />

      <TabsNotCalculator />

      {/* Здесь делим экран на две части: main and aside */}
      <Grid>
        <Route path={path} exact>
          <InformationNotCalculator />
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
