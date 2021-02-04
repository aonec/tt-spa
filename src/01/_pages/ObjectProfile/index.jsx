import React, { useEffect, useState } from 'react';
import styled from 'reshadow/macro';

import {
  Route, useRouteMatch, useParams, useHistory,
} from 'react-router-dom';
import { grid } from '01/r_comp';
import { Header } from './components/Header';
import { Tabs } from './components/Tabs';
import { Information } from './components/Information';
import { Events } from './components/Events';
import { Apartments } from './components/Apartments';
import { Devices } from './components/Devices';
import { useObjectInformation, useFetchPage } from './hooks';
import Index from '../../tt-components/Breadcrumb';
import { getCalculators } from "./apiObjectProfile";

export const ObjectContext = React.createContext();

function reducer(state, action){
  const { type, data } = action;
  switch (type) {
    case 'success':
      return { ...state, ...data };
    default:
      console.error('objid', type);
      return state;
  }
}

export const ObjectProfile = () => {
  const [state, dispatch] = React.useReducer(reducer, {});

  const [addNode, setAddNode] = useState(false);
  const [addCalculator, setAddCalculator] = useState(false);
  const [addOdpu, setAddOdpu] = useState(false);

  const [calculators, setCalculators] = useState();

  useEffect(() => {
    const { housingStock } = state;
    if (housingStock) {
      const { id } = housingStock;
      getCalculators(id).then((res) => {
        setCalculators(res);
        console.log(res)
      })
    }
  }, [state.housingStock])

  useFetchPage(state, dispatch);
  const test = useParams();
  console.log(test)
  const { 0: objid } = useParams();
  const { push } = useHistory();
  const info = useObjectInformation(state);
  const { header = [], events = [], aparts = [] } = state;
  const context = {
    addCalculator, setAddCalculator, addOdpu, setAddOdpu, objid, calculators
  };

  return styled(grid)(
    <>
      <ObjectContext.Provider
        value={context}
      >
        <Index path="/objects/"/>
        <Header {...header} />
        <Tabs/>
        <grid>
          <Route path="/objects/(\\d+)" exact>
            <Information {...info} />
          </Route>

          <Route path="/objects/(\\d+)/apartments" exact>
            <Apartments
              path="/objects/(\\d+)/apartments"
              onClick={(id) => push(`/objects/${objid}/apartments/${id}`)}
              {...state?.apartments}
            />
          </Route>


          <Route path="/objects/(\\d+)/devices" exact>
          <Devices/>
          </Route>

          <Events title="События с объектом" {...events} />
        </grid>
      </ObjectContext.Provider>
    </>,
  );
};

export default ObjectProfile;

// <Route path="/objects/(\\d+)/devices" exact>
//   <Devices
//     path="/*/devices"
//     {...state?.devices}
//     calculators={calculators}
//   />
// </Route>