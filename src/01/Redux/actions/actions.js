export function onChangeFormValueByPath(path, value) {
  return {
    type: 'CALC_UPDATE_FORM_VALUE_BY_PATH',
    payload: { path, value },
  };
}

export function setAddCalculatorForm(path, value) {
  return {
    type: 'CALC_UPDATE_FORM',
    payload: { path, value },
  };
}