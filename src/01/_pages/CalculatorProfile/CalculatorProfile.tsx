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
import CheckDevice from './components/Modals/ModalCheck';
import Nodes from './components/Nodes';
import { CalculatorResponse } from '../../../myApi';
import { TabsItemInterface } from '../../tt-components/interfaces';
import Tabs from '../../tt-components/Tabs';
import RelatedDevices from './components/RelatedDevices';
import ModalDeregister from '../../tt-components/ModalDeregister';

interface TypeDeviceContext {
  device: CalculatorResponse;
  deregister: boolean;
  setDeregister: Dispatch<SetStateAction<boolean>>;
  report: boolean;
  setReport: Dispatch<SetStateAction<boolean>>;
  check: boolean;
  setCheck: Dispatch<SetStateAction<boolean>>;
}

export const DeviceContext = React.createContext<Partial<TypeDeviceContext>>(
  {}
);

export const CalculatorProfile = () => {
  const { deviceId } = useParams();
  const { push } = useHistory();
  const path = `/calculators/${deviceId}`;
  const [isLoading, setIsLoading] = useState(true);
  const [device, setDevice] = useState<CalculatorResponse>();
  const [tasks, setTasks] = useState<any>();
  const [deregister, setDeregister] = useState(false);
  const [report, setReport] = useState(false);
  const [check, setCheck] = useState(false);
  const [error, setError] = useState();
  const [errors, setErrors] = useState();

  const [loadings, setLoadings] = useState({
    device: false,
    tasks: false,
  });

  useEffect(() => {
    setIsLoading(true);
    Promise.allSettled([getCalculator(deviceId), getCalculatorTasks(deviceId)])
      .then((responses: any) => {
        // const [{value : device}, {value: tasks}] = responses;
        const device = responses[0].value;
        const tasks = responses[1].value;
        setDevice(device);
        setTasks(tasks);
        setIsLoading(false);
      })
      .catch(({ resource, message }) => {})
      .finally(() => {
        setLoadings((prev) => ({
          ...prev,
          device: false,
          tasks: false,
        }));
        setIsLoading(false);
      });
  }, []);

  if (!device || !tasks) return <Loader show size={32} />;

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

  console.log('device', device);

  const context = {
    device,
    loadings,
    errors,
    error,
    deregister,
    setDeregister,
    report,
    setReport,
    check,
    setCheck,
  };
  const { nodes } = device;

  if (!nodes) {
    return null;
  }

  if (nodes.length < 1) {
    return null;
  }

  const nodeTemplate = {
    id: 0,
    number: 0,
    nodeStatus: '',
    resource: 'ColdWaterSupply',
    serviceZone: '',
    lastCommercialAccountingDate: '',
    futureCommercialAccountingDate: '',
    calculatorId: 0,
    housingStockId: 0,
    communicationPipes: null,
  };

  return (
    <DeviceContext.Provider value={context}>
      <Header
        device={device}
        setReport={setReport}
        setDeregister={setDeregister}
        setCheck={setCheck}
      />
      <Tabs tabItems={tabItems} />
      <Grid>
        <Route path={`${path}`} exact>
          <Information device={device} />
        </Route>
        <Route path={`${path}/connection`} exact>
          <Connection device={device} />
        </Route>
        <Route path={`${path}/related`} exact>
          <RelatedDevices calculator={device} />
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
      <ModalCalculatorReport />
      <CheckDevice />
    </DeviceContext.Provider>
  );
};

export default CalculatorProfile;
