import React, { useEffect, useState } from 'react';
import { Route, useParams, useHistory } from 'react-router-dom';
import { Header } from './components/Header';
import { Information } from './components/Information';
import { Events } from './components/Events';
import { useObjectInformation, useFetchPage } from './hooks';
import { GoBack } from 'ui-kit/shared_components/GoBack/GoBack';
import { getNodes, getObject } from './apiObjectProfile';
import MapObject from './components/MapObject';
import { Loader } from '../../tt-components';
import Tabs from '../../tt-components/Tabs';
import { ResourceAccountingSystemsContainer } from 'services/devices/resourceAccountingSystemsService';
import { ApartmentsListContainer } from 'services/objects/objectProfileService/apartmentsListService';

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

  const path = `/objects/${housingStockId}`;
  const [state, dispatch] = React.useReducer(reducer, {});

  const [addCalculator, setAddCalculator] = useState(false);
  const [addOdpu, setAddOdpu] = useState(false);
  const [commonReport, setCommonReport] = useState(false);
  const [nodes, setNodes] = useState();
  const [object, setObject] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    Promise.all([
      getNodes(housingStockId).then((res) => {
        const { pipeNodes } = res;

        setNodes(pipeNodes);
      }),
      getObject(housingStockId).then((res) => {
        setObject(res);
      }),
    ]).finally(() => setLoading(false));
  }, []);

  useFetchPage(state, dispatch);

  const { push } = useHistory();
  const info = useObjectInformation(state);
  const { header = [], events = [] } = state;

  if (loading) {
    return <Loader size={'64'} />;
  }
  const context = {
    addCalculator,
    setAddCalculator,
    addOdpu,
    setAddOdpu,
    housingStockId,
    nodes,
    commonReport,
    setCommonReport,
    object,
  };

  const tabItems = [
    {
      title: 'Общая информация',
      key: '',
      cb: () => {
        push(`${path}`);
      },
    },
    {
      title: 'Квартиры',
      key: 'apartments',
      cb: () => {
        push(`${path}/apartments`);
      },
    },
    {
      title: 'Системы учета ресурсов',
      key: 'devices',
      cb: () => {
        push(`${path}/devices`);
      },
    },
  ];

  return (
    <>
      <ObjectContext.Provider value={context}>
        <GoBack />
        <Header
          {...header}
          setCommonReport={setCommonReport}
          commonReport={commonReport}
          object={object}
        />
        <Tabs tabItems={tabItems} tabsType={'route'} />

        <grid>
          <div>
            <Route path="/objects/(\\d+)" exact>
              <div>
                <Information {...info} />
                <MapObject object={object} />
              </div>
            </Route>

            <Route path="/objects/:id/apartments" exact>
              <ApartmentsListContainer />
            </Route>

            <Route path="/objects/:id/devices" exact>
              <ResourceAccountingSystemsContainer />
            </Route>
          </div>

          <Events title="События с объектом" {...events} />
        </grid>
      </ObjectContext.Provider>
    </>
  );
};

export default ObjectProfile;
