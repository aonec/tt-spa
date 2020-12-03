import _ from 'lodash';

const initialState = {
  calculatorId: '',
  lastCheckingDate: '',
  connection: {
    ipV4: '',
    deviceAddress: '',
    port: '',
  },
  futureCheckingDate: '',
  futureCommercialAccountingDate: '',
  housingMeteringDeviceType: '',
  housingStockId: '',
  lastCommercialAccountingDate: '',
  model: '',
  pipe: {
    entryNumber: '',
    hubNumber: '',
    pipeNumber: '',
    magistral: '',
  },
  resource: '',
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
      return action.payload.value;
    default:
      return newState;
  }
}
