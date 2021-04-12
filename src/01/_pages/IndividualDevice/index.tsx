import React, { useEffect, useState } from 'react';
import { Route, useHistory, useParams } from 'react-router-dom';
import { Grid } from '01/_components';
import { Header } from './components/Header';
import { Information } from './components/Information';
import { Loader } from '../../components';
import { Title } from '../../tt-components/Title';
import { useAsync } from '../../hooks/useAsync';
import { IndividualDeviceResponse, TaskListResponse } from '../../../myApi';
import ModalDeregister from '../../tt-components/ModalDeregister';
import Events from '../../tt-components/Events';
import { TabsItemInterface } from '../../tt-components/interfaces';
import Tabs from '../../tt-components/Tabs';
import {
  getIndividualDevice,
  getIndividualDeviceTasks,
} from '../../_api/apiRequests';

export const IndividualDevice = () => {
  const { push } = useHistory();
  const { deviceId } = useParams();
  const path = `/individualDevices/${deviceId}`;
  const { data: device, status, run } = useAsync<IndividualDeviceResponse>();

  const [deregister, setDeregister] = useState(false);
  const { data: tasks, status: tasksStatus, run: tasksRun } = useAsync<
    TaskListResponse[] | null
  >();

  useEffect(() => {
    run(getIndividualDevice(Number(deviceId)));
    tasksRun(getIndividualDeviceTasks(Number(deviceId)));
  }, [deviceId]);

  if (!device || !tasks) {
    return <Loader size={'32'} show />;
  }
  console.log(device);

  const tabItems: Array<TabsItemInterface> = [
    {
      title: 'Общая информация',
      key: '',
      cb: () => {
        push(`${path}`);
      },
    },
    {
      title: 'Документы',
      key: 'documents',
      cb: () => {
        push(`${path}/documents`);
      },
    },
  ];

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
          <Tabs tabItems={tabItems} tabsType={'route'} />
          <Grid>
            <Route path={path} exact>
              <Information device={device} />
            </Route>

            <Route path={`${path}/documents`} exact>
              <Title color="black">Компонент в разработке</Title>
            </Route>

            <Events title="Задачи с объектом" tasks={tasks} />
          </Grid>
          <ModalDeregister
            visible={deregister}
            setVisible={setDeregister}
            device={device}
          />
        </>
      ) : null}
    </>
  );
};

export default IndividualDevice;
