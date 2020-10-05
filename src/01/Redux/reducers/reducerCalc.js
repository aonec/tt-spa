import moment from 'moment';
import _ from 'lodash';

export const initialState = {
  serialNumber: '',
  checkingDate: moment().toISOString(),
  futureCheckingDate: moment().toISOString(),
  lastCommercialAccountingDate: moment().toISOString(),
  connection: {
    ipV4: '192.168.0.1',
    deviceAddress: 0,
    port: 1234,
  },
  futureCommercialAccountingDate: moment().toISOString(),
  housingStockId: 0,
  infoId: 1,
};

export default function reducerCalc(state = initialState, action) {
  const { connection } = state;
  let { ipV4, deviceAddress, port } = connection;

  if (action.type === 'CALC_UPDATE_FORM_VALUE_BY_PATH') {
    const newState = _.cloneDeep(state);
    const {
      payload: { path, value },
    } = action;

    switch (path[0]) {
      case 'port':
        port = value;
        _.set(newState, 'connection', { ipV4, deviceAddress, port });
        return newState;
      case 'ipV4':
        ipV4 = value;
        _.set(newState, 'connection', { ipV4, deviceAddress, port });
        return newState;

      default:
        _.set(newState, path, value);
    }

    return newState;
  }

  return state;
}
