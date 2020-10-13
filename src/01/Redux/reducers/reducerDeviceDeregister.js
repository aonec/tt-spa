import _ from 'lodash';

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
    case 'DEREGISTER_FORM_VISIBLE': {
      const {
        payload: { path, value },
      } = action;
      _.set(newState, path, value);
      return newState;
    }
    case 'DEREGISTER_FORM_UPDATE':
      _.set(newState, action.payload.path, action.payload.value);
      return newState
    default:
      return newState;
  }
}