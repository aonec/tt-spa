import { Route, useParams, useHistory } from 'react-router-dom';
import React, { useState, useEffect, Dispatch, SetStateAction } from 'react';
import { getCalculatorTasks, getCalculator } from './apiCalculatorProfile';
import { Grid } from '../../_components';
import { Header } from './components/Header';
import { Information } from './components/Information';
import { Events } from './components/Events';
import { Connection } from './components/Connection';
import { Loader } from '../../components/Loader';
import Documents from './components/Documents';
import ModalCalculatorReport from './components/Modals/ModalCalculatorReport';
import Nodes from './components/Nodes';
import { CalculatorResponse, TaskListResponse } from '../../../myApi';
import { TabsItemInterface } from '../../tt-components/interfaces';
import Tabs from '../../tt-components/Tabs';
import RelatedDevices from './components/RelatedDevices';
import ModalDeregister from '../../tt-components/ModalDeregister';
import { useAsync } from '../../hooks/useAsync';
import { CalculatorProfileContext } from './CalculatorProfileContext';
import ModalCheckDevice from '../../_modals/ModalCheckDevice';

export const CalculatorProfile = () => {
  const { deviceId } = useParams();
  const { push } = useHistory();
  const path = `/calculators/${deviceId}`;
  const { data: device, status, run } = useAsync<CalculatorResponse>();

  const [tasks, setTasks] = useState<TaskListResponse[] | null>();
  const [deregister, setDeregister] = useState<boolean>(false);

  const [report, setReport] = useState(false);
  const [check, setCheck] = useState(false);

  useEffect(() => {
    run(getCalculator(deviceId));
  }, [deviceId]);

  useEffect(() => {
    getCalculatorTasks(deviceId).then((res: any) => {
      setTasks(res);
    });
  }, []);

  const tabItems: Array<TabsItemInterface> = [
    {
      title: 'Общая информация',
      key: '',
      cb: () => {
        push(`${path}`);
      },
    },
    {
      title: 'Настройки соединения',
      key: 'connection',
      cb: () => {
        push(`${path}/connection`);
      },
    },
    {
      title: 'Узлы',
      key: 'nodes',
      cb: () => {
        push(`${path}/nodes`);
      },
    },
    {
      title: 'Подключенные приборы',
      key: 'related',
      cb: () => {
        push(`${path}/related`);
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

  const context = {
    device,
    deregister,
    setDeregister,
    report,
    setReport,
    check,
    setCheck,
  };

  if (!device || !tasks) {
    return <Loader show={true} size={32} />;
  }

  return (
    <>
      {status === 'error' && <div style={{ background: 'red' }}>ОШИБКА</div>}
      {(status === 'pending' || status === 'idle') && (
        <Loader show={true} size={32} />
      )}
      {status === 'resolved' && (
        <>
          <CalculatorProfileContext.Provider value={context}>
            <Header
              device={device}
              setReport={setReport}
              setDeregister={setDeregister}
              setCheck={setCheck}
            />
            <Tabs tabItems={tabItems} tabsType={'route'} />
          </CalculatorProfileContext.Provider>
          <Grid>
            <Route path={`${path}`} exact>
              <Information device={device} />
            </Route>
            <Route path={`${path}/connection`} exact>
              <Connection device={device} />
            </Route>
            <Route path={`${path}/related`} exact>
              <RelatedDevices device={device} />
            </Route>
            <Route path={`${path}/nodes`} exact>
              <Nodes device={device} />
            </Route>
            <Route path={`${path}/documents`} exact>
              <Documents />
            </Route>
            <Events title="Задачи с объектом" tasks={tasks} />
          </Grid>
          <ModalDeregister
            visible={deregister}
            setVisible={setDeregister}
            device={device}
          />

          <ModalCalculatorReport
            report={report}
            setReport={setReport}
            device={device}
          />

          <ModalCheckDevice
            device={device}
            visible={check}
            setVisible={setCheck}
          />
        </>
      )}
    </>
  );
};

export default CalculatorProfile;
