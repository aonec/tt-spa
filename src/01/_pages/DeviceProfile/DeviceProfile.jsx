import React, { useState, useEffect } from 'react';
import styled from 'reshadow/macro';

import {
  Route, useRouteMatch, useParams, useHistory,
} from 'react-router-dom';
import { grid } from '01/r_comp';
import { getInfo, getObjectOfDevice } from '01/_api/device_page';
import { Header } from './components/Header';
import { Tabs } from './components/Tabs';
import { Information } from './components/Information';
import { History } from './components/History';
import { Events } from './components/Events';
import { Changes } from './components/Changes';
import { Documents } from './components/Documents';

import { useObjectInformation, useFetchPage, useDeviceChanges } from './hooks';

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
export const DeviceContext = React.createContext();

export const DeviceProfile = (props) => {
  const a = props.location.pathname;
  console.log('deviceprops', a);

  const [state, dispatch] = React.useReducer(reducer, {});
  useFetchPage(state, dispatch);
  const { 0: objid } = useParams();
  console.log('objid', objid);

  const params = useParams();
  console.log(params[0]);
  console.log(params[1]);
  const deviceId = params[1];
  const buildingId = params[0];
  

  const { push } = useHistory();
  const info = useObjectInformation(state);
  const changes = useDeviceChanges(state);
  const { header = [], events = [], aparts = [] } = state;

  const [device, setDevice] = useState();
  const [building, setBuilding] = useState()

  const {
    calculator,
    canBeEdited,
    closingDate,
    commercialAccountingDate,
    diameter,
    futureCheckingDate,
    housingStockId,
    id,
    ipV4,
    lastCheckingDate,
    model,
    resource,
    serialNumber,
    type,
    underTransaction,
    url,
  } = { ...device };


  useEffect(() => {
    async function getDeviceInfo() {
      await getInfo(deviceId).then((response) => setDevice(response));
    }
    getDeviceInfo();

    async function getObjectOfDeviceWrap() {
      await getObjectOfDevice(buildingId).then((response) => setBuilding(response));
    }
    getObjectOfDeviceWrap();
    
  }, []);

  const buttonHandler = () => {
    // console.log('buttonHandler');
    // console.log(device);
  };



  return styled(grid)(
    <>
      <DeviceContext.Provider value={device}>
        {/* <button onClick={buttonHandler}>button</button> */}
        <Header {...device}  {...building}/>
        <Tabs />
        <grid>
          <Route path="/*/(\\d+)" exact>
            <Information {...info} {...device} />
            {/* <Events title="Задачи с объектом" {...events} /> */}
          </Route>
          {/* <Route
                  path="/objects/(\\d+)/devices/(\\d+)/(testimony|documents|changes)?"
                  component={DeviceProfile}
                  exact
                /> */}
        </grid>
        <Route path="/*/(\\d+)/documents" exact>
          <Documents {...info} />
        </Route>

        <Route path="/*/(\\d+)/testimony" exact>
          <History {...info} />
        </Route>

        <Route path="/*/(\\d+)/changes" exact>
          <Changes {...info} />
        </Route>
      </DeviceContext.Provider>
    </>,
  );
};

export default DeviceProfile;
