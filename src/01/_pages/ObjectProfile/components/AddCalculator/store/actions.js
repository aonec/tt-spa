export function onChangeFormValueByPath(name, val) {
  return {
    type: 'CALC_UPDATE_FORM_VALUE_BY_PATH',
    payload: { [name]: val },
  };
}
