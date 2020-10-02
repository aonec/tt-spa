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
        const res = { value, deviceAddress, port };
        _.set(newState, 'connection', { ipV4, deviceAddress, port });
        return newState;

      default:
    }

    // if (path[0] === "port") {
    //   port = value;
    //   _.set(newState, "connection", { ipV4, deviceAddress, port });
    //   return newState;
    // }

    // if (path[0] === "ipV4") {
    //   ipV4 = value;
    //   const res = { value, deviceAddress, port };
    //   _.set(newState, "connection", { ipV4, deviceAddress, port });
    //   return newState;
    // }

    _.set(newState, path, value);
    return newState;
  }

  return state;
}

// const INFO_ID = 'InfoId';
// const SERIAL_NUMBER = 'serialNumber';
// const CHECKING_DATE = 'checkingDate';
// const FUTURE_CHECKING_DATE = 'futureCheckingDate';
// const LAST_COMMERCIAL_ACCOUNTING_DATE = 'lastCommercialAccountingDate';
// const IPV4 = 'ipV4';
// const DEVICE_ADDRESS = 'deviceAddress';
// const PORT = 'port';
// const FUTURE_COMMERCIAL_ACCOUNTING_DATE = 'futureCommercialAccountingDate';
// const HOUSE_STOCKING_ID = 'housingStockId';

// console.log(connection);

// if (action.type === INFO_ID) {
//   return { ...state, infoId: +action.value };
// }
// if (action.type === SERIAL_NUMBER) {
//   // здесь это тоже передается строковым значением
//   return { ...state, serialNumber: `${action.value}` };
// }
// if (action.type === HOUSE_STOCKING_ID) {
//   return { ...state, housingStockId: action.value };
// }
// if (action.type === LAST_COMMERCIAL_ACCOUNTING_DATE) {
//   return { ...state, lastCommercialAccountingDate: action.value };
// }
// if (action.type === CHECKING_DATE) {
//   return { ...state, checkingDate: action.value };
// }
// if (action.type === FUTURE_CHECKING_DATE) {
//   return { ...state, futureCheckingDate: action.value };
// }
// if (action.type === FUTURE_COMMERCIAL_ACCOUNTING_DATE) {
//   return { ...state, futureCommercialAccountingDate: action.value };
// }
// if (action.type === PORT) {
//   port = Number(action.value);
//   return { ...state, connection: { ipV4, deviceAddress, port } };
// }
// if (action.type === IPV4) {
//   ipV4 = `${action.value}`;
//   return { ...state, connection: { ipV4, deviceAddress, port } };
// }
