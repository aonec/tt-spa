import React, { createContext, useEffect, useState } from 'react';
import { Route } from 'react-router-dom';
import Header from './components/Header';
import { Tabs } from './components/Tabs';
import { Grid } from '../../_components/Grid';
import Information from './components/Information'
import { Events } from './components/Events';

import { getCalculator } from './apiNodeProfile';

export const NodeContext = createContext();
export const Node = () => {
  console.log('Node');

  const [node, setNode] = useState();

  useEffect(() => {
    getCalculator().then((res) => {
      setNode(res);
    });
  }, []);

  if (!node) {
    return (
      <div>ЗАГРУЗКА</div>
    )
  }

  const context = { node };
  return (
    <NodeContext.Provider value={context}>
      <Header />
      <Tabs />
      <Grid>
        <Route path={`/node/25`} exact>
         <Information />
        </Route>
        <Route path={`/node/25/related`} exact>
          {/* <RelatedDevices /> */}
          RelatedDevices
        </Route>


        <Events title="Задачи с объектом" />
      </Grid>
    </NodeContext.Provider>
  );
};
export default Node;
