/* eslint-disable */

import React from 'react';
import { useRouteMatch, useHistory } from 'react-router-dom';

import {
  getInfo,
  getEvents,
  getApartments,
  getDevices,
} from '01/_api/objects_page';

export const useFetchPage = (state, dispatch) => {
  const { url, path, isExact, params } = useRouteMatch('/:page/:id');
  const pageApart = useRouteMatch(path + '/apartments');
  const pageDevice = useRouteMatch(path + '/devices');

  const { isExact: isPageDeviceExact, url: pageDeviceUrl } = pageDevice || {};
  const { isExact: isPageApartmentExact } = pageApart || {};
  const { info, events, devices, apartments } = state;

  React.useEffect(() => {
    if (isExact && !info) {
      getInfo(url).then((data) => dispatch({ type: 'success', data }));
    }
    if (isPageDeviceExact && !devices) {
      getDevices(pageDeviceUrl).then((data) =>
        dispatch({ type: 'success', data })
      );
    }
    if (isPageApartmentExact && !apartments && params.id) {
      getInfo(url).then((data) => dispatch({ type: 'success', data }));
      getApartments({ housingStockId: params.id }).then((data) =>
        dispatch({ type: 'success', data })
      );
    }

    if ((info || devices) && !events) {
      getEvents(params.id).then((data) => dispatch({ type: 'success', data }));
    }
  }, [
    isExact,
    url,
    info,
    events,
    apartments,
    devices,
    isPageDeviceExact,
    isPageApartmentExact,
  ]);
};
