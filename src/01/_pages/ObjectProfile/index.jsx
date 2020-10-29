import React from 'react';
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
import ButtonTT from '../../tt-components/ButtonTT';
import Breadcrumb from "../../tt-components/Breadcrumb/Breadcrumb";

function reducer(state, action) {
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
  useFetchPage(state, dispatch);
  const { 0: objid } = useParams();
  const { push } = useHistory();
  const info = useObjectInformation(state);
  const { header = [], events = [], aparts = [] } = state;
  debugger;

  return styled(grid)(
    <>
      <Breadcrumb />
      <Header {...header} />
      <div style={{}}>
        {/* <ButtonTT disabled={true}> */}
        {/*  button */}
        {/* </ButtonTT> */}
      </div>
      <Tabs />
      <grid>
        <Route path="/*/(\\d+)" exact>
          <Information {...info} />
        </Route>

        <Apartments
          path="/*/apartments"
          onClick={(id) => push(`/objects/${objid}/apartments/${id}`)}
          {...state?.apartments}
        />
        <Devices
          path="/*/devices"
          {...state?.devices}
        />
        <Events title="События с объектом" {...events} />
      </grid>
    </>,
  );
};

export default ObjectProfile;
