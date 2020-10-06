export function onChangeFormValueByPath(path, value) {
  return {
    type: 'CALC_UPDATE_FORM_VALUE_BY_PATH',
    payload: { path, value },
  };
}

export function DefaultFormValueFullfill(path, value) {
  return {
    type: 'CALC_UPDATE_FORM',
    payload: { path, value },
  };
}

export function onChangeDeviceFormValueByPath(path, value) {
  return {
    type: 'DEV_UPDATE_FORM_VALUE_BY_PATH',
    payload: { path, value },
  };
}

export function fullfillAddDeviceForm(path, value) {
  return {
    type: 'DEV_UPDATE_FORM',
    payload: { path, value },
  };
}
