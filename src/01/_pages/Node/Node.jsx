import React, { createContext, useEffect, useState } from 'react';
import { Route, useParams, useRouteMatch } from 'react-router-dom';
import Header from './components/Header';
import { Tabs } from './components/Tabs';
import { Grid } from '../../_components/Grid';
import Information from './components/Information';
import RelatedDevices from './components/RelatedDevices';
import { Events } from './components/Events';
import { getCalculator, getCalculatorTasks, getNode } from './apiNodeProfile';
import Connection from './components/Connection';
import Documents from './components/Documents';
import { LoaderTT } from '../../tt-components/LoaderTT';

export const NodeContext = createContext();
export const Node = () => {
  console.log('Node');
  const { url } = useRouteMatch('/nodes/(\\d+)');
  const { nodeId } = useParams();

  console.log('nodeId', nodeId);
  const [node, setNode] = useState();
  const [calculator, setCalculator] = useState();
  // const [tasks, setTasks] = useState();
  const [showDisable, setShowDisable] = useState(false);
  const [showEnable, setShowEnable] = useState(false);

  const [visible, setVisible] = useState({
    showDisable: false,
    showEnable: false,
  });
  const [switched, setSwitched] = useState(true);
  useEffect(() => {
    getNode(nodeId).then((res) => {
      getCalculator(res.calculatorId).then((res) => {
        setCalculator(res);
        console.log('res', res);
      });
      setNode(res);
    });
  }, []);

  if (!node || !calculator) {
    return (
      <LoaderTT />
    );
  }

  const context = {
    node,
    calculator,
    showDisable,
    setShowDisable,
    showEnable,
    setShowEnable,
    visible,
    setVisible,
    switched,
    setSwitched,
  };

  return (
    <NodeContext.Provider value={context}>
      <Header />
      <Tabs />
      <Grid>
        <Route path={`${url}`} exact>
          <Information />
        </Route>
        <Route path={`${url}/connection`} exact>
          <Connection />
        </Route>
        <Route path={`${url}/related`} exact>
          <RelatedDevices />
        </Route>
        <Route path={`${url}/documents`} exact>
          <Documents />
        </Route>
        {/* <Events title="Задачи с объектом" /> */}
      </Grid>
    </NodeContext.Provider>
  );
};
export default Node;
