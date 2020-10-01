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

export function counter1(state = initialState, action) {
  const { connection } = state;
  const { ipV4, deviceAddress, port } = connection;
  if (action.type === 'ADD') {
    return { ...state, infoId: state.infoId + 1 };
  }
  if (action.type === 'SUB') {
    return { ...state, infoId: state.infoId - 1 };
  }

  if (action.type === 'ADD_NUMBER') {
    return { ...state, infoId: state.infoId + action.payload };
  }
}

export default counter1;
