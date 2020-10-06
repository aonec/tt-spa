import _ from 'lodash';
import moment from 'moment';

const initialState = {
  calculatorId: 1553976,
  checkingDate: moment().toISOString(),
  connection: {
    ipV4: '',
    deviceAddress: '',
    port: '',
  },
  futureCheckingDate: moment().toISOString(),
  futureCommercialAccountingDate: moment().toISOString(),
  housingMeteringDeviceType: 'FlowMeter',
  housingStockId: '',
  lastCommercialAccountingDate: moment().toISOString(),
  model: 'TEST',
  pipe: {
    entryNumber: 1,
    hubNumber: 1,
    pipeNumber: 1,
    magistral: '',
  },
  resource: 'ColdWaterSupply',
  serialNumber: '',
};

export default function deviceReducer(state = initialState, action) {
  const newState = _.cloneDeep(state);
  switch (action.type) {
    case 'DEV_UPDATE_FORM_VALUE_BY_PATH':
      const {
        payload: { path, value },
      } = action;
      _.set(newState, path, value);
      return newState;
    case 'DEV_UPDATE_FORM':
      console.log(action);
      return action.payload.value;
    default:
      return newState;
  }
}

// case 'CALC_UPDATE_FORM_VALUE_BY_PATH':
// case 'CALC_UPDATE_FORM_VALUE_BY_PATH':

// case 'addDevice/DEV_UPDATE_FORM_VALUE_BY_PATH':
// case 'addCalculator/DEV_UPDATE_FORM_VALUE_BY_PATH':
