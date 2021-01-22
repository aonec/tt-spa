import React, { useState, useEffect } from 'react';
import { Route, useParams } from 'react-router-dom';
import { Grid } from '01/_components';
import {getIndividualDevice, getIndividualDeviceTasks} from "./apiIndividualDevice";
import { Header } from './components/Header';
import { Tabs } from './components/Tabs';
import { Information } from './components/Information';
import { Events } from './components/Events';
import {Loader} from "../../components";
import {IndividualDeviceType, DeviceContextType, ParamTypes} from "./components/individualDeviceTypes";
import {Title} from "../../tt-components/Title";

export const DeviceContext = React.createContext({} as DeviceContextType);

export const IndividualDevice = () => {
  const { 0: deviceId } = useParams<ParamTypes>();

  const [device, setDevice] = useState({} as IndividualDeviceType);
  const [tasks, setTasks] = useState();
  const [mistake, setMistake] = useState();


  useEffect(() => {
    Promise.all([
      getIndividualDevice(deviceId),
      getIndividualDeviceTasks(deviceId),
    ]).then((responses) => {
      const [device, tasks] = responses;
      setDevice(device);
      setTasks(tasks);
    }).catch((error) => {
      setMistake(error);
    });
  }, []);

  const path = `/individualDevices/${deviceId}/`;
  const context = {
    device,
    tasks,
    mistake,
  }
  if (!device) {
    return <Loader size={'32'} show />
  }
  return (
      <DeviceContext.Provider value={context}
      >
        <Header />
        <Tabs />

        {/* Здесь делим экран на две части: main and aside */}
        <Grid>
          <Route path={path} exact>
            <Information />
          </Route>

          <Route path={`${path}readings`} exact>
            <Title color="black">Компонент в разработке</Title>
          </Route>

          <Route path={`${path}documents`} exact>
            <Title color="black">Компонент в разработке</Title>
          </Route>

          <Route path={`${path}changes`} exact>
            <Title color="black">Компонент в разработке</Title>
          </Route>

          <Events title="Задачи с объектом" />
        </Grid>
      </DeviceContext.Provider>
  );
};

export default IndividualDevice;
