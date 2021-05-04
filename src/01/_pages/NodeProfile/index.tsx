import React, { useEffect, useState } from 'react';
import { Route, useHistory, useParams } from 'react-router-dom';
import Header from './components/Header';
import { Grid } from '../../_components/Grid';
import Documents from './components/Documents';
import Graph from '../Graph/Graph';
import { useAsync } from '../../hooks/useAsync';
import {
  CalculatorResponse,
  NodeResponse,
  TaskListResponse,
} from '../../../myApi';
import { Loader } from '../../components';
import { Alert } from 'antd';
import NodeRelatedDevices from '../../tt-components/NodeRelatedDevices';
import Information from './components/Information';
import NodeConnection from '../../tt-components/NodeConnection';
import Tabs from '../../tt-components/Tabs';
import { TabsItemInterface } from '../../tt-components/interfaces';
import { Events } from '../../tt-components';
import { getCalculator, getNode, getNodeTasks } from '../../_api/apiRequests';
import HousingMeteringDeviceReadings from '../../features/HousingMeteringDeviceReadings/components';

export const NodeProfile = () => {
  const { nodeId } = useParams();
  const { push } = useHistory();
  const path = `/nodes/${nodeId}`;
  const [addDevice, setAddDevice] = useState(false);
  const [tasks, setTasks] = useState<TaskListResponse[] | null>();

  const { data: node, status, run } = useAsync<NodeResponse | null>();
  const {
    data: calculator,
    status: statusCalculator,
    run: runCalculator,
  } = useAsync<CalculatorResponse>();

  useEffect(() => {
    run(getNode(nodeId));
  }, [nodeId]);

  useEffect(() => {
    node && node.calculatorId
      ? runCalculator(getCalculator(node.calculatorId))
      : console.log('wait');
  }, [node]);

  useEffect(() => {
    getNodeTasks(nodeId).then((res) => {
      setTasks(res);
    });
  }, []);

  if (!node || !calculator || !tasks) {
    return <Loader size={'32'} show />;
  }

  if (status === 'error')
    return (
      <Alert
        message="Ошибка"
        description="На сервере произошла непредвиденная ошибка. Попробуйте перезагрузить страницу"
        type="error"
        showIcon
        closable
        style={{ marginBottom: 24, marginTop: 24 }}
      />
    );

  if (status === 'pending' || status === 'idle')
    return <Loader size={'32'} show />;

  const { resource, communicationPipes } = node;

  const tabItems: Array<TabsItemInterface> = [
    {
      title: 'Общая информация',
      key: '',
      cb: () => {
        console.log('');
        push(`${path}`);
      },
    },
    {
      title: 'Статистика',
      key: 'stats',
      cb: () => {
        console.log('stats');
        push(`${path}/stats`);
      },
    },
    {
      title: 'Ввод показаний',
      key: 'readings',
      cb: () => {
        console.log('readings');
        push(`${path}/readings`);
      },
    },
    {
      title: 'Настройки соединения',
      key: 'connection',
      cb: () => {
        console.log('connection');
        push(`${path}/connection`);
      },
    },
    {
      title: 'Подключенные приборы',
      key: 'related',
      cb: () => {
        console.log('related');
        push(`${path}/related`);
      },
    },
    {
      title: 'Документы приборы',
      key: 'documents',
      cb: () => {
        console.log('documents');
        push(`${path}/documents`);
      },
    },
  ];

  return (
    <>
      <Header
        node={node}
        calculator={calculator}
        setAddDevice={setAddDevice}
        nodeId={nodeId}
      />
      <Tabs tabItems={tabItems} tabsType={'route'} />
      <Grid>
        <Route path={path} exact>
          <Information calculator={calculator} node={node} />
        </Route>
        <Route path={`${path}/stats`} exact>
          {resource && communicationPipes && communicationPipes.length > 0 ? (
            <Graph
              nodeId={nodeId}
              resource={resource}
              pipeCount={communicationPipes.length}
            />
          ) : (
            <>
              <Alert
                message="Ошибка"
                description="На сервере произошла непредвиденная ошибка. В скором времени она будет устранена."
                type="error"
                showIcon
                closable
                style={{ marginBottom: 24, marginTop: 24 }}
              />
            </>
          )}
        </Route>

        <Route path={`${path}/readings`} exact>
          <HousingMeteringDeviceReadings nodeId={nodeId} />
        </Route>

        <Route path={`${path}/connection`} exact>
          <NodeConnection calculator={calculator} edit={false} />
        </Route>
        <Route path={`${path}/related`} exact>
          <NodeRelatedDevices node={node} />
        </Route>
        <Route path={`${path}/documents`} exact>
          <Documents />
        </Route>
        <Events title="Задачи с объектом" tasks={tasks} />
      </Grid>
    </>
  );
};
export default NodeProfile;
