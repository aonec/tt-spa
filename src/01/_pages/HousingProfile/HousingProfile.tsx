import { Route, useParams } from 'react-router-dom';
import React, { useState, useEffect, Dispatch, SetStateAction } from 'react';
import { Grid } from '01/_components';
import { getHousingTasks, getHousingMeteringDevice } from './apiHousingProfile';
import { Header } from './components/Header';
import { TabsHousingMeteringDevice } from './components/Tabs';
import { Information } from './components/Information';
import { Events } from './components/Events';
import { Connection } from './components/Connection';
import Documents from './components/Documents';
import { RelatedDevices } from './components/RelatedDevices';
import DeregisterDevice from './components/Modals/ModalDeregister';
import { Loader } from '../../../components';
import {
  CalculatorResponse,
  HousingMeteringDeviceResponse,
  TaskListResponse,
} from '../../../myApi';
import { useAsync } from '../../hooks/useAsync';
import { getCalculator } from '../EditCalculator/components/apiEditCalculator';

export const HousingProfile = () => {
  const { deviceId } = useParams();
  const path = `/housingMeteringDevices/${deviceId}/`;

  const [isLoading, setIsLoading] = useState(true);
  const {
    data: device,
    status,
    run,
  } = useAsync<HousingMeteringDeviceResponse>();

  const [tasks, setTasks] = useState();
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
  return (
    // <HousingContext.Provider value={context}>
    <>
      <Header device={device} />
      <TabsHousingMeteringDevice />
      <Grid>
        <Route path={`${path}`} exact>
          <Information device={device} />
        </Route>
        <Route path={`${path}related`} exact>
          <RelatedDevices device={device} />
        </Route>
        {/*  <Route path={`${path}documents`} exact>*/}
        {/*    <Documents />*/}
        {/*  </Route>*/}
        {/*  <Events title="Задачи с объектом" />*/}
      </Grid>
      {/*<DeregisterDevice />*/}
    </>
    // </HousingContext.Provider>
  );
};

export default HousingProfile;
