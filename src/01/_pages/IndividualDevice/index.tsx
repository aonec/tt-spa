import React, { useEffect } from 'react';
import { Route, useParams } from 'react-router-dom';
import { Grid } from '01/_components';
import {
  getIndividualDevice,
  getIndividualDeviceTasks,
} from './apiIndividualDevice';
import { Header } from './components/Header';
import { Information } from './components/Information';
import { Loader } from '../../components';
import { ParamTypes } from './components/individualDeviceTypes';
import { Title } from '../../tt-components/Title';
import { useAsync } from '../../hooks/useAsync';
import { IndividualDeviceResponse, TaskListResponse } from '../../../myApi';
import { TabsIndividualDevice } from './components/Tabs';
import Events from './components/Events';

export const IndividualDevice = () => {
  const { 0: deviceId } = useParams<ParamTypes>();
  const { data: device, status, run } = useAsync<IndividualDeviceResponse>();
  const { data: tasks, status: tasksStatus, run: tasksRun } = useAsync<
    TaskListResponse[] | null
  >();

  useEffect(() => {
    run(getIndividualDevice(Number(deviceId)));
    tasksRun(getIndividualDeviceTasks(Number(deviceId)));
  }, [deviceId]);

  if (!device || !tasks) {
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

          <Grid>
            <Route path={path} exact>
              <Information device={device} />
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
            <Events title="Задачи с объектом" tasks={tasks} />
          </Grid>
        </>
      ) : null}
    </>
  );
};

export default IndividualDevice;
