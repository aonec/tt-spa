import _ from 'lodash';

const initialState = {
  serialNumber: '',
  checkingDate: '',
  futureCheckingDate: '',
  lastCommercialAccountingDate: '',
  connection: {
    ipV4: '',
    deviceAddress: '',
    port: '',
  },
  futureCommercialAccountingDate: '',
  housingStockId: '',
  infoId: '',
};

export default function calculatorReducer(state = initialState, action) {
  const newState = _.cloneDeep(state);

  switch (action.type) {
    case 'CALC_UPDATE_FORM_VALUE_BY_PATH':
      const {
        payload: { path, value },
      } = action;
      _.set(newState, path, value);
      return newState;
    case 'CALC_UPDATE_FORM_DEFAULT':
      console.log(action);
      return action.payload.value;
    default:
      return newState;
  }
}

// const initialState = {
//   serialNumber: '',
//   checkingDate: moment().toISOString(),
//   futureCheckingDate: moment().toISOString(),
//   lastCommercialAccountingDate: moment().toISOString(),
//   connection: {
//     ipV4: '192.168.0.1',
//     deviceAddress: 0,
//     port: 1234,
//   },
//   futureCommercialAccountingDate: moment().toISOString(),
//   housingStockId: 0,
//   infoId: 1,
// };
