import moment from 'moment';
import _ from 'lodash';

const initialState = {
  serialNumber: null,
  checkingDate: null,
  futureCheckingDate: null,
  lastCommercialAccountingDate: null,
  connection: {
    ipV4: null,
    deviceAddress: null,
    port: null,
  },
  futureCommercialAccountingDate: null,
  housingStockId: null,
  infoId: null,
};

const initialStateTemplate = {
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

export const calc = (state = initialState, action) => {
  const { connection } = state;
  const { ipV4, deviceAddress, port } = connection;
  const newState = _.cloneDeep(state);

  if (action.type === 'CALC_UPDATE_FORM_VALUE_BY_PATH') {
    const {
      payload: { path, value },
    } = action;
    _.set(newState, path, value);
    return newState;
  }
  return newState;
};

export default calc;
