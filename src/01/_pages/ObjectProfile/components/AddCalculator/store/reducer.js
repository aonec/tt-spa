import moment from 'moment';
import _ from 'lodash';
import { CHANGE_INPUT_VALUE } from './constants';

const initialState = {
  serialNumber: '',
  checkingDate: moment().toISOString(),
  futureCheckingDate: moment().toISOString(),
  lastCommercialAccountingDate: moment().toISOString(),
  connection: {
    ipV4: '192.168.0.1',
    deviceAddress: 0,
    port: 1234,
  },
  futureCommercialAccountingDate: { value: '4', label: '4 года', id: 1 },
  housingStockId: 0,
  infoId: 1,
};

const calc = (state = initialState, action) => {
  const { connection } = state;
  const { ipV4, deviceAddress, port } = connection;
  const newState = _.cloneDeep(state);

  switch (action.type) {
    case CHANGE_INPUT_VALUE:
      if (action.payload.port) {
        _.set(newState, 'connection', {
          ipV4,
          deviceAddress,
          port: action.payload.port,
        });
        return newState;
      }

      if (action.payload.ipV4) {
        _.set(newState, 'connection', {
          ipV4: action.payload.ipV4,
          deviceAddress,
          port,
        });
        return newState;
      }
      return { ...newState, ...action.payload };
    default:
      return newState;
  }
};

export default calc;

// if (path === "port") {
//   port = value;
//   _.set(newState, "connection", { ipV4, deviceAddress, port });
//   return newState;
// }

// if (path === "ipV4") {
//   ipV4 = value;
//   const res = { value, deviceAddress, port };
//   _.set(newState, "connection", { ipV4, deviceAddress, port });
//   return newState;
// }
