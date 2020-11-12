import {  Route, useParams} from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { Grid } from '01/_components';
import { getHousingTasks, getHousing } from './apiHousingProfile';
import { Header } from './components/Header';
import { Tabs } from './components/Tabs';
import { Information } from './components/Information';
import { Events } from './components/Events';
import { Connection } from './components/Connection';
import Documents from './components/Documents';

import { RelatedDevices } from './components/RelatedDevices';
import ButtonTT from "../../tt-components/ButtonTT";

export const HousingContext = React.createContext();

export const HousingProfile = () => {
  const { deviceId, objid } = useParams();
  const path = `/housingMeteringDevices/${deviceId}/`;

  const [isLoading, setIsLoading] = useState(true);
  const [device, setDevice] = useState();
  const [building, setBuilding] = useState();
  const [tasks, setTasks] = useState();
  const [related, setRelated] = useState();
  const [hubs, setHubs] = useState();
  const [calcModel, setCalcModel] = useState();
  const [calcId, setCalcId] = useState();

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
    calculator: 'Произошла ошибка при загрузке ресурсов вычислителя',
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
        setBuilding(device.address);
        setTasks(tasks.items);
        setRelated(device.hubConnection);
        setCalcId(device.hubConnection.calculatorId);
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

  const buttonHandler = () => {
    console.log('buttonHandler');
    console.log(related)
  };

  return (
    <HousingContext.Provider
      value={{
        device,
        building,
        tasks,
        related,
        loadings,
        errors,
        error,
        hubs,
        calcModel,
      }}
    >
      <Header />
      <h1>HousingProfile</h1>
      <ButtonTT onClick={buttonHandler}>buttonHandler</ButtonTT>
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

    </HousingContext.Provider>
  );
};

export default HousingProfile;
