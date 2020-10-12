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

export function onChangeDeviceFormValueByPath(path, value) {
  return {
    type: 'DEV_UPDATE_FORM_VALUE_BY_PATH',
    payload: { path, value },
  };
}

export function setAddDeviceForm(path, value) {
  return {
    type: 'DEV_UPDATE_FORM',
    payload: { path, value },
  };
}

// Изменение отображния модального окна ModalDeregisterDevice
export function setModalVisible(path, value) {
  return {
    type: 'DEREGISTER_FORM_VISIBLE',
    payload: { path, value },
  };
}
