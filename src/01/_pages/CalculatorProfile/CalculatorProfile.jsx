import { Route, useParams, useLocation } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { getCalculatorTasks, getCalculator } from './apiCalculatorProfile';
import { Grid } from '../../_components';

import { Header } from './components/Header';
import { Tabs } from './components/Tabs';
import { Information } from './components/Information';
import { Events } from './components/Events';
import { Connection } from './components/Connection';
import { RelatedDevices } from './components/RelatedDevices';

import { Loader } from '../../components/Loader';
import Documents from './components/Documents';
import DeregisterDevice from './components/Modals/ModalDeregister'
import ModalCalculatorReport from "./components/Modals/ModalCalculatorReport";


export const DeviceContext = React.createContext();

export const CalculatorProfile = () => {
  const { deviceId } = useParams();
  const path = `/calculators/${deviceId}/`;

  const [isLoading, setIsLoading] = useState(true);
  const [device, setDevice] = useState();
  const [building, setBuilding] = useState();
  const [tasks, setTasks] = useState();
  const [related, setRelated] = useState();
  const [hubs, setHubs] = useState();
  const [deregister, setDeregister] = useState(false);
  const [report, setReport] = useState(false);

  const [error, setError] = useState();
  const [errors, setErrors] = useState();

  const [loadings, setLoadings] = useState({
    device: true,
    building: true,
    tasks: true,
    related: true,
  });
  const errorsTemplate = {
    device: 'Произошла ошибка запроса устройства',
    building: 'Произошла ошибка при загрузке данных по зданию',
    tasks: 'Произошла ошибка при загрузке данных по задачам',
    related: 'Произошла ошибка при загрузке данных по подключенным устройствам',
  };

  useEffect(() => {
    setIsLoading(true);
    Promise.allSettled([
      getCalculator(deviceId),
      getCalculatorTasks(deviceId),
    ])
      .then((responses) => {
        const [{ value: device }, { value: tasks }] = responses;
        setDevice(device);
        setBuilding(device.address);
        setHubs(device.hubs);
        setTasks(tasks.items);
        setRelated(device.hubs);
        setIsLoading(false);
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
        }));
        setIsLoading(false);
      });
  }, []);

  if (isLoading) return <Loader show size={32} />;
  const context = {
    device,
    building,
    tasks,
    related,
    loadings,
    errors,
    error,
    hubs,
    deregister,
    setDeregister,
    report, setReport
  };
  return (
    <DeviceContext.Provider
      value={context}
    >
      <Header />
      <Tabs />
      <Grid>
        <Route path={`${path}`} exact>
          <Information />
        </Route>
        <Route path={`${path}connection`} exact>
          <Connection />
        </Route>
        <Route path={`${path}related`} exact>
          <RelatedDevices />
        </Route>
        <Route path={`${path}documents`} exact>
          <Documents />
        </Route>

        <Events title="Задачи с объектом" />
      </Grid>
      <DeregisterDevice />
      <ModalCalculatorReport />
    </DeviceContext.Provider>
  );
};

export default CalculatorProfile;
