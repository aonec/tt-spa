import React, { createContext, useEffect, useState } from 'react';
import {
  Route, useHistory, useParams, useRouteMatch,
} from 'react-router-dom';
import Header from './components/Header';
import { Tabs } from './components/Tabs';
import { Grid } from '../../_components/Grid';
import Information from './components/Information';
import RelatedDevices from './components/RelatedDevices';
import { getCalculator, getNode } from './apiNodeProfile';
import Connection from './components/Connection';
import Documents from './components/Documents';

export const NodeContext = createContext();
export const NodeProfile = () => {
  const { push } = useHistory();

  const { url } = useRouteMatch('/nodes/(\\d+)');
  const { nodeId } = useParams();
  const [node, setNode] = useState();
  const [calculator, setCalculator] = useState();
  const [currentTab, setCurrentTab] = useState('1');

  function handleChangeTab(value) {
    console.log('value', value);
    setCurrentTab(value);
  }

  useEffect(() => {
    getNode(nodeId).then((res) => {
      getCalculator(res.calculatorId).then((result) => {
        setCalculator(result);
      });
      setNode(res);
    });
  }, []);

  if (!node || !calculator) {
    return (
      <div>
        Загрузка
      </div>
    );
  }


  const context = {
    node,
    calculator,
    handleChangeTab,
    currentTab,
    setCurrentTab,
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
export default NodeProfile;
