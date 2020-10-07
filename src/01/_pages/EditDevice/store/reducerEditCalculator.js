import _ from 'lodash';
import moment from 'moment'

const initialState = {
  serialNumber: 'serialNumber',
  checkingDate: moment(),
  futureCheckingDate: moment(),
  lastCommercialAccountingDate: moment(),
  connection: {
    ipV4: '192.168.0.1',
    deviceAddress: 1234,
    port: 1234,
  },
  futureCommercialAccountingDate: moment(),
  housingStockId: '',
  infoId: 1,
};

// const initialState = {
//   serialNumber: '',
//   checkingDate: '',
//   futureCheckingDate: '',
//   lastCommercialAccountingDate: '',
//   connection: {
//     ipV4: '',
//     deviceAddress: '',
//     port: '',
//   },
//   futureCommercialAccountingDate: '',
//   housingStockId: '',
//   infoId: '',
// };

export default function editCalculatorReducer(state = initialState, action) {
  const newState = _.cloneDeep(state);

  switch (action.type) {
    case 'CALC_EDIT_FORM_VALUE_BY_PATH':
      const {
        payload: { path, value },
      } = action;
      _.set(newState, path, value);
      return newState;
    case 'CALC_EDIT_FORM':
      return action.payload.value;
    default:
      return newState;
  }
}