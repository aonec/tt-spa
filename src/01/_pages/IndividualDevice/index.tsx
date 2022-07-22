import React, { useEffect, useState } from 'react';
import { Route, useHistory, useParams } from 'react-router-dom';
import { Header } from './components/Header';
import { Information } from './components/Information';
import { Loader } from '../../components';
import { Title } from '../../tt-components/Title';
import { useAsync } from '../../hooks/useAsync';
import { IndividualDeviceResponse, TaskListResponse } from '../../../myApi';
import ModalDeregister from '../../tt-components/ModalDeregister';
import Events from '../../tt-components/Events';
import {
  getIndividualDevice,
  getIndividualDeviceTasks,
} from '../../_api/apiRequests';
import { Grid } from '01/_components/Grid';
import { TabsSC } from './IndividualDevice.styled';
import { IndividualDeviceGrouptype } from './IndividualDevice.types';
const { TabPane } = TabsSC;

export const IndividualDevice = () => {
  const { deviceId } = useParams();
  const path = `/individualDevices/${deviceId}`;
  const [grouptype, setGrouptype] = useState<IndividualDeviceGrouptype>(
    IndividualDeviceGrouptype.info
  );
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
          <TabsSC
            activeKey={grouptype}
            onChange={(grouptype) =>
              setGrouptype(grouptype as IndividualDeviceGrouptype)
            }
          >
            <TabPane
              tab={'Общая информация'}
              key={IndividualDeviceGrouptype.info}
            >
              <Grid>
                <Information device={device} />
                <Events title="Задачи с объектом" tasks={tasks} />
              </Grid>
            </TabPane>
            <TabPane
              tab={'Документы'}
              key={IndividualDeviceGrouptype.documents}
            >
              <Grid>
                <Title color="black">Компонент в разработке</Title>
                <Events title="Задачи с объектом" tasks={tasks} />
              </Grid>
            </TabPane>
          </TabsSC>

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
