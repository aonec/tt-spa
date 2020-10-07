export function onChangeEditCalculatorFormValueByPath(path, value) {
    return {
      type: 'CALC_EDIT_FORM_VALUE_BY_PATH',
      payload: { path, value },
    };
  }
  
  export function setEditCalculatorForm(path, value) {
    return {
      type: 'CALC_EDIT_FORM',
      payload: { path, value },
    };
  }