import React, { useEffect, useMemo, useState } from 'react';
import styled from 'reshadow/macro';
import { Route, useParams, useHistory, Link } from 'react-router-dom';
import { grid } from '01/r_comp';
import { Header } from './components/Header';
import { Information } from './components/Information';
import { Events } from './components/Events';
import { Apartments } from './components/Apartments';
import { Devices } from './components/Devices';
import { useObjectInformation, useFetchPage } from './hooks';
import { GoBack } from 'ui-kit/shared_components/GoBack/GoBack';
import { getNodes, getObject } from './apiObjectProfile';
import MapObject from './components/MapObject';
import { Loader } from '../../tt-components';
import Tabs from '../../tt-components/Tabs';
import { Alert } from '01/shared/ui/Alert/Alert';
import { AlertContent, AlertWrapper } from './objectProfileService.styled';
import { objectProfileService } from './objectProfileService.model';
import { useStore } from 'effector-react';
import { actResourceNamesLookup } from 'ui-kit/shared_components/ResourceInfo/ResourceInfo.utils';
import moment from 'moment';
import { EResourceDisconnectingType } from 'myApi';

export const ObjectContext = React.createContext();

const { gates, outputs } = objectProfileService;
const { ObjectProfileIdGate } = gates;

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

  const disconnections = useStore(outputs.$resourceDisconnections);

  const disconnectionsAlert = useMemo(
    () =>
      disconnections.map((disconnection) => {
        const resourceName = actResourceNamesLookup[disconnection.resource];
        const entDate = moment(disconnection.endDate).format('DD.MM.YYYY');

        const disconnectionType = disconnection.disconnectingType.description;
        const disconnectionTypeText =
          disconnection.disconnectingType.value ===
          EResourceDisconnectingType.Repair
            ? disconnectionType
            : `${disconnectionType} отключение`.toLowerCase();

        return (
          <AlertWrapper>
            <Alert type="blueStop">
              <AlertContent>
                <div>
                  На объекте {disconnectionTypeText} {resourceName} до {entDate}
                </div>
                <Link
                // to={`disconnectionsList/${disconnection.id}`}
                >
                  Подробнее
                </Link>
              </AlertContent>
            </Alert>
          </AlertWrapper>
        );
      }),
    [disconnections]
  );

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
  const { header = [], events = [], aparts = [] } = state;

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
      title: 'ОДПУ',
      key: 'devices',
      cb: () => {
        push(`${path}/devices`);
      },
    },
  ];

  return styled(grid)(
    <>
      <ObjectProfileIdGate objectId={Number(housingStockId)} />
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
              {disconnectionsAlert}
              <div>
                <Information {...info} />
                <MapObject object={object} />
              </div>
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
              <Devices nodes={nodes} />
            </Route>
          </div>

          <Events title="События с объектом" {...events} />
        </grid>
      </ObjectContext.Provider>
    </>
  );
};

export default ObjectProfile;
