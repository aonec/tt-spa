import _ from 'lodash';
import { devicesAPI } from '../../_api/devices_page';

const SET_DEVICES = 'SET_DEVICES';
const SET_RELATED_DEVICES = 'SET_RELATED_DEVICES';

const initialState = {
  totalItems: 23788,
  pageNumber: 1,
  pageSize: 500,
  totalPages: 48,
  hasPreviousPage: false,
  hasNextPage: true,
  nextPageNumber: 2,
  previousPageNumber: 1,
  devices: []
};

export default function reducerDevicesPage(state = initialState, action) {
  switch (action.type) {
    case SET_DEVICES:
      debugger;
      return { ...state, devices: [...action.devices] };

  }
  return state;
}

export const setDevices = (devices) => ({ type: SET_DEVICES, devices });

export const getDevices = () => async (dispatch) => {
const devices = await devicesAPI.getDevices();
const devicesWithRelated = await Promise.all(devices.map(async (d) => {
    const relatedDevices = await devicesAPI.getRelatedDevices(d.id);
    debugger;
    // if (!relatedDevices.length) return {...d, relatedDevices}
    // return { ...d, property: '123' };
    return {...d, relatedDevices: [...relatedDevices]}
  }));
  console.log('devicesWithRelated');
  dispatch(setDevices(devicesWithRelated));
};
