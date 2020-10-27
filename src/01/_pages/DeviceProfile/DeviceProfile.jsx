import { Route, useParams, useLocation } from 'react-router-dom';
import _ from 'lodash';
import React, { useState, useEffect } from 'react';
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
import ModalDeregisterDevice from '../../_modals/ModalDeregisterDevice';
import { RelatedDevices } from './components/RelatedDevices';
import { RelatedDevicesNotCalculator } from './components/RelatedDevicesNotCalculator';
import { HeaderNotCalculator } from './components/HeaderNotCalculator';

export const DeviceContext = React.createContext();

export const DeviceProfile = () => {
  const params = useParams();

  let deviceId;
  let objid;
  let path;

  // let { 0: objid, 1: deviceId } = useParams();

  const [isLoading, setIsLoading] = useState(true);
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
    typeODPU: false,
  });
  const errorsTemplate = {
    device: 'Произошла ошибка запроса устройства',
    building: 'Произошла ошибка при загрузке данных по зданию',
    tasks: 'Произошла ошибка при загрузке данных по задачам',
    related: 'Произошла ошибка при загрузке данных по подключенным устройствам',
    typeODPU: 'Произошла ошибка при загрузке данных по типу устройства',
    calculator: 'Произошла ошибка при загрузке ресурсов вычислителя',
  };

  const { pathname } = useLocation();
  // debugger;

  if (Object.keys(params).length === 3) {
    deviceId = params[1];
    objid = params[0];
    path = `/objects/${objid}/devices/${deviceId}/`;
  } else if (pathname.includes('calculator')) {
    deviceId = params[0];
    path = `/calculators/${deviceId}/`;
  } else if (pathname.includes('housingMeteringDevices')) {
    deviceId = params[0];
    path = `/housingMeteringDevices/${deviceId}/`
  }


  useEffect(() => {
    Promise.allSettled([
      getInfo(deviceId),
      getObjectOfDevice(objid),
      getODPUTasks(deviceId),
      getRelatedDevices(deviceId),
      getTypeODPU(deviceId),
      // getCalculatorResources(deviceId),
    ])
      .then((responses) => {
        // const [device, building, tasks, related, typeODPU] = responses;
        // debugger;
        const [{value: device}, {value: building}, {value: tasks}, {value: related}, {value: typeODPU}] = responses;
        // const device = responses[0].value;
        // const building = responses[1].value;
        // const tasks = responses[2].value;
        // const related = responses[3].value;
        // const typeODPU = responses[4].value;
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
        setIsLoading(false);
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

  // const path = `/objects/${objid}/devices/${deviceId}/`;

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
        <ModalDeregisterDevice deviceId={deviceId} />
      </DeviceContext.Provider>
    );
  }

  if (isLoading || typeODPU == undefined) return 'ЗАГРУЗКА...';
  // debugger;
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
      <ModalDeregisterDevice deviceId={deviceId} />
    </DeviceContext.Provider>
  );
};

export default DeviceProfile;
