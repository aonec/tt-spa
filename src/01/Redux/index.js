import moment from 'moment';

export const initialState = {
  checkingDate: moment().toISOString(),
  futureCheckingDate: moment().toISOString(),
  lastCommercialAccountingDate: moment().toISOString(),
  connection: {
    ipV4: '192.168.0.1',
    deviceAddress: 1234567890,
    port: 1234,
  },
  futureCommercialAccountingDate: moment().toISOString(),
  housingStockId: 0,
  infoId: 1,
  serialNumber: 'REDUX',
};

export function reducer(state = initialState, action) {
  const { connection } = state;
  let { ipV4, deviceAddress, port } = connection;

  console.log(connection);

  if (action.type === 'InfoId') {
    return { ...state, infoId: action.value };
  }
  if (action.type === 'serialNumber') {
    // здесь это тоже передается строковым значением

    return { ...state, serialNumber: `${action.value}` };
  }
  if (action.type === 'housingStockId') {
    return { ...state, housingStockId: action.value };
  }
  if (action.type === 'port') {
    return { ...state, port: action.value };
  }
  if (action.type === 'ipV4') {
    ipV4 = `${action.value}`;
    const res = { ipV4, deviceAddress, port };
    return { ...state, connection: res };
  }

  return state;
}
