import React, { createContext, useEffect, useState } from 'react';
import { Route, useParams, useRouteMatch } from 'react-router-dom';
import Header from './components/Header';
import { Tabs } from './components/Tabs';
import { Grid } from '../../_components/Grid';
import Information from './components/Information';
import RelatedDevices from './components/RelatedDevices';
import { Events } from './components/Events';

import { getCalculator, getCalculatorTasks } from './apiNodeProfile';

export const NodeContext = createContext();
export const Node = () => {
  console.log('Node');

  const { url } = useRouteMatch('/nodes/(\\d+)');
  const { nodeId } = useParams();
  const [node, setNode] = useState();
  const [tasks, setTasks] = useState();

  console.log('nodeId', nodeId);

  useEffect(() => {
    getCalculator(nodeId).then((res) => {
      setNode(res);
    });
    getCalculatorTasks(nodeId).then((res) => {
      setTasks(res);
      console.log(res)
    });

  }, []);

  if (!node && !tasks) {
    return (
      <div>ЗАГРУЗКА</div>
    );
  }

  const context = { node, tasks };
  return (
    <NodeContext.Provider value={context}>
      <Header />
      <Tabs />
      <Grid>
        <Route path={`${url}`} exact>
          <Information />
        </Route>
        <Route path={`${url}/related`} exact>
          <RelatedDevices />
        </Route>
        <Events title="Задачи с объектом" />
      </Grid>
    </NodeContext.Provider>
  );
};
export default Node;
