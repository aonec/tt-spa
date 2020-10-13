import _ from 'lodash';
import moment from 'moment';

const initialState = {
  visible: false,
  deregisterFormState: {
    deviceId: '',
    documentsIds: [],
    closingDateTime: '',
  },
};

export default function deviceDeregisterReducer(state = initialState, action){
  const newState = _.cloneDeep(state);
  switch (action.type) {
    case 'DEREGISTER_FORM_VISIBLE':
      const {
        payload: { path, value },
      } = action;
      _.set(newState, path, value);
      return newState;
    case 'DEREGISTER_FORM_UPDATE':
      console.log(action);
      return action.payload.value;
    default:
      return newState;
  }
}

// const initialState = {
//   calculatorId: '',
//   checkingDate: '',
//   connection: {
//     ipV4: '',
//     deviceAddress: '',
//     port: '',
//   },
//   futureCheckingDate: '',
//   futureCommercialAccountingDate: '',
//   housingMeteringDeviceType: '',
//   housingStockId: '',
//   lastCommercialAccountingDate: '',
//   model: '',
//   pipe: {
//     entryNumber: '',
//     hubNumber: '',
//     pipeNumber: '',
//     magistral: '',
//   },
//   resource: '',
//   serialNumber: '',
// };
