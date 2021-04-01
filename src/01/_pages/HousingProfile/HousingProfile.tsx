import { Route, useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { Grid } from '01/_components';
import { getHousingTasks, getHousingMeteringDevice } from './apiHousingProfile';
import { Header } from './components/Header';
import { Information } from './components/Information';
import { Events } from './components/Events';
import Documents from './components/Documents';
import { RelatedDevices } from './components/RelatedDevices';
import DeregisterDevice from './components/Modals/ModalDeregister';
import {
  HousingMeteringDeviceResponse,
  TaskListResponse,
} from '../../../myApi';
import { useAsync } from '../../hooks/useAsync';

export const HousingProfile = () => {
  const { deviceId } = useParams();
  const path = `/housingMeteringDevices/${deviceId}/`;

  const {
    data: device,
    status,
    run,
  } = useAsync<HousingMeteringDeviceResponse>();

  const [tasks, setTasks] = useState<TaskListResponse[] | null>();
  const [deregister, setDeregister] = useState<boolean>(false);

  useEffect(() => {
    run(getHousingMeteringDevice(deviceId));
  }, [deviceId]);

  useEffect(() => {
    getHousingTasks(deviceId).then((res: any) => {
      setTasks(res);
    });
  }, []);

  if (!device || !tasks) {
    return null;
  }

  // console.log(deregister);

  const tabItems: Array<Array<string>> = [
    ['Общая информация', ''],
    ['Подключенные приборы', 'related'],
    ['Документы', 'documents'],
  ];

  return (
    <>
      <Header device={device} setDeregister={setDeregister} />
      <Grid>
        <Route path={`${path}`} exact>
          <Information device={device} />
        </Route>
        <Route path={`${path}related`} exact>
          <RelatedDevices device={device} />
        </Route>
        <Route path={`${path}documents`} exact>
          <Documents />
        </Route>
        <Events title="Задачи с объектом" tasks={tasks} />
      </Grid>
      <DeregisterDevice
        deregister={deregister}
        device={device}
        setDeregister={setDeregister}
      />
    </>
  );
};

export default HousingProfile;
