import React, { useEffect, useState } from 'react';
import styled from 'reshadow/macro';
import { Route, useParams, useHistory } from 'react-router-dom';
import { grid } from '01/r_comp';
import { Header } from './components/Header';
import { Tabs } from './components/Tabs';
import { Information } from './components/Information';
import { Events } from './components/Events';
import { Apartments } from './components/Apartments';
import { Devices } from './components/Devices';
import { useObjectInformation, useFetchPage } from './hooks';
import Index from '../../tt-components/Breadcrumb';
import { getCalculators, getObject, getServiceZones } from './apiObjectProfile';
import { Loader } from '../../../components';
import MapObject from './components/MapObject';

export const ObjectContext = React.createContext();

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
  const { housingStockId } = useParams();

  const [state, dispatch] = React.useReducer(reducer, {});

  const [addCalculator, setAddCalculator] = useState(false);
  const [addOdpu, setAddOdpu] = useState(false);
  const [commonReport, setCommonReport] = useState(false);
  const [calculators, setCalculators] = useState();
  const [object, setObject] = useState();

  useEffect(() => {
    getCalculators(housingStockId).then((res) => {
      const { items } = res;
      setCalculators(items);
    });
    getObject(housingStockId).then((res) => {
      setObject(res);
    });
  }, []);

  useFetchPage(state, dispatch);

  const { push } = useHistory();
  const info = useObjectInformation(state);
  const { header = [], events = [], aparts = [] } = state;

  if (!object || !calculators) {
    return <Loader show={true} size={64} />;
  }
  const context = {
    addCalculator,
    setAddCalculator,
    addOdpu,
    setAddOdpu,
    housingStockId,
    calculators,
    commonReport,
    setCommonReport,
    object,
  };

  return styled(grid)(
    <>
      <ObjectContext.Provider value={context}>
        <Index path="/objects/" />
        <Header
          {...header}
          setCommonReport={setCommonReport}
          commonReport={commonReport}
          object={object}
        />
        <Tabs />
        <grid>
          <Route path="/objects/(\\d+)" exact>
            <Information {...info} />
            <MapObject />
          </Route>

          <Route path="/objects/(\\d+)/apartments" exact>
            <Apartments
              path="/objects/(\\d+)/apartments"
              onClick={(id) =>
                push(`/objects/${housingStockId}/apartments/${id}`)
              }
              {...state?.apartments}
            />
          </Route>

          <Route path="/objects/(\\d+)/devices" exact>
            <Devices calculators={calculators} />
          </Route>

          <Events title="События с объектом" {...events} />
        </grid>
      </ObjectContext.Provider>
    </>
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
