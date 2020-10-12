import _ from 'lodash';

const initialState = {
  visible: false
}


export default function reducerDeviceDeregister(state = initialState, action) {
  const newState = _.cloneDeep(state);
  // switch (action.type) {
  //   case 'DEV_UPDATE_FORM_VALUE_BY_PATH':
  //     const {
  //       payload: { path, value },
  //     } = action;
  //     _.set(newState, path, value);
  //     return newState;
  //   case 'DEV_UPDATE_FORM':
  //     console.log(action);
  //     return action.payload.value;
  //   default:
      return newState;
  // }
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