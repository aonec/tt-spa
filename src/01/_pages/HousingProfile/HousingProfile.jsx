import { Route, useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { Grid } from '01/_components';
import Loader from 'react-loader';
import { getHousingTasks, getHousing } from './apiHousingProfile';
import { Header } from './components/Header';
import { Tabs } from './components/Tabs';
import { Information } from './components/Information';
import { Events } from './components/Events';
import { Connection } from './components/Connection';
import Documents from './components/Documents';
import { RelatedDevices } from './components/RelatedDevices';
import DeregisterDevice from './components/Modals/ModalDeregister';

export const HousingContext = React.createContext();

export const HousingProfile = () => {
  const { deviceId, objid } = useParams();
  const path = `/housingMeteringDevices/${deviceId}/`;

  const [isLoading, setIsLoading] = useState(true);
  const [device, setDevice] = useState();
  const [tasks, setTasks] = useState();
  const [deregister, setDeregister] = useState(false);

  const [error, setError] = useState();
  const [errors, setErrors] = useState();

  const [loadings, setLoadings] = useState({
    device: true,
    tasks: true,
  });
  const errorsTemplate = {
    device: 'Произошла ошибка запроса устройства',
    tasks: 'Произошла ошибка при загрузке данных по задачам',
  };

  useEffect(() => {
    setIsLoading(true);
    Promise.allSettled([
      getHousing(deviceId),
      getHousingTasks(deviceId),
    ])
      .then((responses) => {
        const [{ value: device }, { value: tasks }] = responses;
        setDevice(device);
        setTasks(tasks.items);
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
          tasks: false,
        }));
        setIsLoading(false);
      });
  }, []);

  const context = {
    device,
    tasks,
    loadings,
    errors,
    error,
    deregister,
    setDeregister,
  };

  if (!device) {
    return (
      <Loader />
    );
  }
  return (
    <HousingContext.Provider
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
    </HousingContext.Provider>
  );
};

export default HousingProfile;
