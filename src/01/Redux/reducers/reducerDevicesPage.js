import _ from 'lodash';
import { devicesAPI } from '../../_api/devices_page';

const SET_DEVICES = 'SET_DEVICES';

const initialState = {
  successResponse: {
    totalItems: 23788,
    pageNumber: 1,
    pageSize: 500,
    totalPages: 48,
    hasPreviousPage: false,
    hasNextPage: true,
    nextPageNumber: 2,
    previousPageNumber: 1,
    items: [
      {
        id: 1554432,
        housingStockId: 485,
        ipV4: '192.168.0.1',
        port: 1234,
        deviceAddress: 93,
        model: 'ТЭМ-106',
        serialNumber: '282655303',
        type: 'Calculator',
        resource: null,
        pipe: null,
        closingDate: null,
        futureCheckingDate: '2020-09-29T15:25:56.669',
        timeZoneOffset: '03:00:00',
        mountPlace: null,
        rateType: null,
        currentReadings: null,
        previousReadings: null,
      },
    ],
  },
};

export default function reducerDevicesPage(state = initialState, action) {
  switch (action.type) {
    case SET_DEVICES:
      return { ...state, devices: [...action.devices] };
  }
  return state;
}

export const setDevices = (devices) => ({ type: SET_DEVICES, devices });

export const getDevices = () => async (dispatch) => {
  const devices = await devicesAPI.getDevices();
  dispatch(setDevices(devices));
};
