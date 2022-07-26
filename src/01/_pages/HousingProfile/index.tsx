import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { getHousingTasks, getHousingMeteringDevice } from './apiHousingProfile';
import { Header } from './components/Header';
import { Information } from './components/Information';
import { RelatedDevices } from './components/RelatedDevices';
import {
  PipeHousingMeteringDeviceResponse,
  TaskListResponse,
} from '../../../myApi';
import { useAsync } from '../../hooks/useAsync';
import ModalDeregister from '../../tt-components/ModalDeregister';
import ModalCheckDevice from '../../_modals/ModalCheckDevice';
import Events from '../../tt-components/Events';
import { Grid } from '01/_components/Grid';
import { DocumentsWrapper, TabsSC } from './HousingProfile.styled';
import { HousingProfileGrouptype } from './HousingProfile.types';
import { GoBack } from 'ui-kit/shared_components/GoBack';
const { TabPane } = TabsSC;

export const HousingProfile = () => {
  const { deviceId } = useParams();
  const path = `/housingMeteringDevices/${deviceId}`;

  const {
    data: device,
    status,
    run,
  } = useAsync<PipeHousingMeteringDeviceResponse>();

  const [tasks, setTasks] = useState<TaskListResponse[] | null>();
  const [deregister, setDeregister] = useState<boolean>(false);
  const [checkVisible, setCheckVisible] = useState(false);
  const [grouptype, setGrouptype] = useState<HousingProfileGrouptype>(
    HousingProfileGrouptype.info
  );

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
    <>
      <GoBack />
      <Header
        device={device}
        setDeregister={setDeregister}
        setCheckVisible={setCheckVisible}
      />
      <TabsSC
        activeKey={grouptype}
        onChange={(grouptype) =>
          setGrouptype(grouptype as HousingProfileGrouptype)
        }
      >
        <TabPane tab="Общая информация" key={HousingProfileGrouptype.info}>
          <Grid>
            <Information device={device} />
            <Events title="Задачи с объектом" tasks={tasks} />
          </Grid>
        </TabPane>
        <TabPane
          tab="Подключенные приборы"
          key={HousingProfileGrouptype.related}
        >
          <Grid>
            <RelatedDevices device={device} />
            <Events title="Задачи с объектом" tasks={tasks} />
          </Grid>
        </TabPane>
        <TabPane tab="Документы" key={HousingProfileGrouptype.documents}>
          <Grid>
            <DocumentsWrapper>
              Компонент Документы в процессе разработки
            </DocumentsWrapper>
            <Events title="Задачи с объектом" tasks={tasks} />
          </Grid>
        </TabPane>
      </TabsSC>

      <ModalDeregister
        visible={deregister}
        setVisible={setDeregister}
        device={device}
      />
      <ModalCheckDevice
        device={device}
        visible={checkVisible}
        setVisible={setCheckVisible}
      />
    </>
  );
};

export default HousingProfile;
