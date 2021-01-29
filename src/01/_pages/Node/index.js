import React, { createContext, useEffect, useState } from 'react';
import { Route, useParams, useRouteMatch } from 'react-router-dom';
import Header from './components/Header';
import { Tabs } from './components/Tabs';
import { Grid } from '../../_components/Grid';
import Information from './components/Information';
import RelatedDevices from './components/RelatedDevices';
import { Events } from './components/Events';

import { getCalculator, getCalculatorTasks } from './apiNodeProfile';

import { nodeTemplate } from './template'

export const NodeContext = createContext();
export const Node = () => {
  console.log('Node');

  const { url } = useRouteMatch('/nodes/(\\d+)');
  const { nodeId } = useParams();
  const [node, setNode] = useState();
  const [calculator, setCalculator] = useState();
  // const [tasks, setTasks] = useState();
  const [showDisable, setShowDisable] = useState(false)
  const [showEnable, setShowEnable] = useState(false)

  const [visible, setVisible] = useState({
    showDisable: false,
    showEnable: false,
  })
  const [switched, setSwitched] = useState(true);

  console.log('nodeId', nodeId);

  useEffect(() => {
    setNode(nodeTemplate);
    // getCalculator(nodeTemplate.calculatorId).then((res) => {
    //   setCalculator(res);
    // })
    // getCalculator(nodeId).then((res) => {

    // });
    // getCalculatorTasks(nodeId).then((res) => {
    //   setTasks(res.items);
    //   console.log(res)
    // });

  }, []);

  // if (!node && !tasks) {
  //   return (
  //     <div>ЗАГРУЗКА</div>
  //   );
  // }

  if (!node) {
    return (
      <div>ЗАГРУЗКА</div>
    );
  }

  // const context = { node, tasks, showDisable, setShowDisable, showEnable, setShowEnable, visible, setVisible,  switched, setSwitched};
  const context = {
    node,
    // calculator,
    // showDisable,
    // setShowDisable,
    // showEnable,
    // setShowEnable,
    // visible,
    // setVisible,
    // switched,
    // setSwitched
  };

  debugger

  return (
    <NodeContext.Provider value={context}>
      <div>test</div>
      {/*<Header/>*/}
      {/*<Tabs/>*/}
      {/*<Grid>*/}
      {/*  <Route path={`${url}`} exact>*/}
      {/*    <Information/>*/}
      {/*  </Route>*/}
      {/*  <Route path={`${url}/related`} exact>*/}
      {/*    <RelatedDevices/>*/}
      {/*  </Route>*/}
      {/*  <Events title="Задачи с объектом" />*/}
      {/*</Grid>*/}
    </NodeContext.Provider>
  );
};
export default Node;
