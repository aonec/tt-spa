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
      console.log(action);
      return action.payload.value;
    default:
      return newState;
  }
}