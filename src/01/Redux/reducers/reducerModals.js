import _ from 'lodash';

const initialState = {
  ModalTemplate: {
    visible: false,
  },
  ModalCalculatorReport: {
    visible: false,
  },
};

export default function modalsReducer(state = initialState, action) {
  const newState = _.cloneDeep(state);
  const { payload } = action;
  switch (action.type) {
    case 'MODAL_TEMPLATE_FORM_VISIBLE2': {
      _.set(newState, 'visible', payload.value);
      return newState;
    }
    case 'MODAL_TEMPLATE_FORM_VISIBLE':
      _.set(newState, payload.path, payload.value);
      return newState;
    case 'MODAL_CALCULATOR_REPORT_FORM_VISIBLE':
      _.set(newState, payload.path, payload.value);
      return newState;
    default:
      return newState;
  }
}
