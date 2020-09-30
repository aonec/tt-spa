import moment from 'moment';

export const initialState = {
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
  serialNumber: 'serialNumber',
};

export function reducerCalc(state = initialState, action) {
  const { connection } = state;
  let { ipV4, deviceAddress, port } = connection;

  // console.log(connection);

  if (action.type === 'InfoId') {
    return { ...state, infoId: Number(action.value) };
  }
  if (action.type === 'serialNumber') {
    // здесь это тоже передается строковым значением
    return { ...state, serialNumber: `${action.value}` };
  }
  if (action.type === 'housingStockId') {
    return { ...state, housingStockId: action.value };
  }
  if (action.type === 'lastCommercialAccountingDate') {
    return { ...state, lastCommercialAccountingDate: action.value };
  }
  if (action.type === 'checkingDate') {
    return { ...state, checkingDate: action.value };
  }
  if (action.type === 'futureCheckingDate') {
    return { ...state, futureCheckingDate: action.value };
  }
  if (action.type === 'futureCommercialAccountingDate') {
    return { ...state, futureCommercialAccountingDate: action.value };
  }
  if (action.type === 'port') {
    port = Number(action.value);
    return { ...state, connection: { ipV4, deviceAddress, port } };
  }
  if (action.type === 'ipV4') {
    ipV4 = `${action.value}`;
    return { ...state, connection: { ipV4, deviceAddress, port } };
  }
  return state;
}
