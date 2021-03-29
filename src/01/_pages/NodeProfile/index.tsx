import React, { createContext, useEffect, useState } from 'react';
import { Route, useParams, useRouteMatch } from 'react-router-dom';
import Header from './components/Header';
import { Grid } from '../../_components/Grid';
import Information from './components/Information';
import RelatedDevices from './components/RelatedDevices';
import { getCalculator, getNode } from './apiNodeProfile';
import Connection from './components/Connection';
import Documents from './components/Documents';
import { Tabs, Title } from '../../tt-components';
import GraphView from '../Graph/components/GraphView';
import Graph from '../Graph/Graph';
import ModalAddDevice from './Modals/ModalAddDevice';
import { useAsync } from '../../hooks/useAsync';
import { CalculatorResponse, NodeResponse } from '../../../myApi';

export interface MatchParams {
  nodeId: string;
}

export const NodeProfile = () => {
  const matchParams = useRouteMatch<MatchParams>(
    '/nodes/:nodeId/(stats|connection|related|documents)?'
  );
  const { nodeId } = useParams();

  const tabItems: string[][] = [
    ['Общая информация', ''],
    ['Статистика', 'stats'],
    ['Настройки соединения', 'connection'],
    ['Подключенные приборы', 'related'],
    ['Документы', 'documents'],
  ];
  const [currentTab, setCurrentTab] = useState<string>('1');

  function handleChangeTab(value: string) {
    setCurrentTab(value);
  }

  const [addOdpu, setAddOdpu] = useState(false);

  const {
    data: calculator,
    status: statusCalculator,
    run: runCalculator,
  } = useAsync<CalculatorResponse>();
  const { data: node, status, run } = useAsync<NodeResponse>();

  useEffect(() => {
    run(getNode(nodeId));
  }, [nodeId]);

  useEffect(() => {
    node && node.calculatorId
      ? runCalculator(getCalculator(node.calculatorId))
      : console.log('wait');
  }, [node]);

  //
  if (!node || !calculator) {
    return <div>Загрузка</div>;
  }

  console.log('node', node);
  console.log('calculator', calculator);
  const path = `/nodes/${nodeId}`;
  console.log('path', path);

  return (
    <>
      <Header
        node={node}
        calculator={calculator}
        setAddOdpu={setAddOdpu}
        nodeId={nodeId}
      />
      <Tabs tabItems={tabItems} path={'/nodes/(\\d+)'} />
      <Grid>
        <Route path={path} exact>
          <Information calculator={calculator} node={node} />
        </Route>
        <Route path={`${path}/stats`} exact>
          {/*<Graph*/}
          {/*  nodeId={nodeId}*/}
          {/*  resource={resource}*/}
          {/*  pipeCount={communicationPipes.length}*/}
          {/*/>*/}
        </Route>
        <Route path={`${path}/connection`} exact>
          <Connection calculator={calculator} />
        </Route>
        <Route path={`${path}/related`} exact>
          <RelatedDevices node={node} />
        </Route>
        {/*  <Route path={`${url}/documents`} exact>*/}
        {/*    <Documents />*/}
        {/*  </Route>*/}
        {/*  /!*<Events title="Задачи с объектом" /> *!/*/}
      </Grid>
      {/*<ModalAddDevice />*/}
    </>
  );
};
export default NodeProfile;
