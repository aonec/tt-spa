import React, { useEffect, useState } from 'react';
import { Route, useParams } from 'react-router-dom';
import Header from './components/Header';
import { Grid } from '../../_components/Grid';
import Information from './components/Information';
import RelatedDevices from './components/RelatedDevices';
import { getCalculator, getNode } from './apiNodeProfile';
import Connection from './components/Connection';
import Documents from './components/Documents';
import { Tabs } from '../../tt-components';
import Graph from '../Graph/Graph';
import ModalAddDevice from './Modals/ModalAddDevice';
import { useAsync } from '../../hooks/useAsync';
import { CalculatorResponse, NodeResponse } from '../../../myApi';
import { Loader } from '../../components';
import { Alert } from 'antd';

export const NodeProfile = () => {
  const { nodeId } = useParams();
  const path = `/nodes/${nodeId}`;
  const [addDevice, setAddDevice] = useState(false);

  const { data: node, status, run } = useAsync<NodeResponse>();
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

  if (!node || !calculator) {
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
  const tabItems: Array<Array<string>> = [
    ['Общая информация', ''],
    ['Статистика', 'stats'],
    ['Настройки соединения', 'connection'],
    ['Подключенные приборы', 'related'],
    ['Документы', 'documents'],
  ];

  return (
    <>
      <Header
        node={node}
        calculator={calculator}
        setAddDevice={setAddDevice}
        nodeId={nodeId}
      />
      <Tabs tabItems={tabItems} path={path} />
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
        <Route path={`${path}/connection`} exact>
          <Connection calculator={calculator} />
        </Route>
        <Route path={`${path}/related`} exact>
          <RelatedDevices node={node} />
        </Route>
        <Route path={`${path}/documents`} exact>
          <Documents />
        </Route>
        {/*<Events title="Задачи с объектом" tasks={tasks} />*/}
      </Grid>
      <ModalAddDevice
        addDevice={addDevice}
        calculator={calculator}
        node={node}
        setAddDevice={setAddDevice}
      />
    </>
  );
};
export default NodeProfile;
