import React, { useState, useEffect } from 'react';
import { Route, useParams } from 'react-router-dom';
import { Grid } from '01/_components';
import {
  getIndividualDevice,
  getIndividualDeviceTasks,
} from './apiIndividualDevice';
import { Header } from './components/Header';
import { Information } from './components/Information';
import { Events } from './components/Events';
import { Loader, Tabs } from '../../components';
import {
  DeviceContextType,
  ParamTypes,
} from './components/individualDeviceTypes';
import { Title } from '../../tt-components/Title';
import { useAsync } from '../../hooks/useAsync';
import { IndividualDeviceResponse, TaskListResponse } from '../../../myApi';
import { TabsIndividualDevice } from './components/Tabs';

// export const DeviceContext = React.createContext({} as DeviceContextType);

export const IndividualDevice = () => {
  const { 0: deviceId } = useParams<ParamTypes>();
  const { data: device, status, run } = useAsync<IndividualDeviceResponse>();
  const { data: tasks, status: tasksStatus, run: tasksRun } = useAsync<
    TaskListResponse[] | null
  >();

  useEffect(() => {
    run(getIndividualDevice(Number(deviceId)));
    // tasksRun(getIndividualDeviceTasks(Number(deviceId)));
  }, [deviceId]);

  if (!device) {
    return null;
  }

  const path = `/individualDevices/${deviceId}/`;

  return (
    <>
      {status === 'error' ? (
        <div style={{ background: 'red' }}>ОШИБКА</div>
      ) : null}
      {status === 'pending' || status === 'idle' ? (
        <Loader size={'32'} show />
      ) : null}
      {status === 'resolved' ? (
        <>
          <Header device={device} />
          <TabsIndividualDevice />
        </>
      ) : null}
    </>
  );
  // <DeviceContext.Provider value={context}>
  //   <Header />
  //   <Tabs />
  //
  //   {/* Здесь делим экран на две части: main and aside */}
  //   <Grid>
  //     <Route path={path} exact>
  //       <Information />
  //     </Route>
  //
  //     <Route path={`${path}readings`} exact>
  //       <Title color="black">Компонент в разработке</Title>
  //     </Route>
  //
  //     <Route path={`${path}documents`} exact>
  //       <Title color="black">Компонент в разработке</Title>
  //     </Route>
  //
  //     <Route path={`${path}changes`} exact>
  //       <Title color="black">Компонент в разработке</Title>
  //     </Route>
  //
  //     <Events title="Задачи с объектом" />
  //   </Grid>
  // </DeviceContext.Provider>
};

export default IndividualDevice;
