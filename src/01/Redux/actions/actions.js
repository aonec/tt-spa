export const onChangeFormValueByPath = (path, value) => ({
  type: 'CALC_UPDATE_FORM_VALUE_BY_PATH',
  payload: { path, value },
});

export const setAddCalculatorForm = (path, value) => ({ type: 'CALC_UPDATE_FORM', payload: { path, value } });

export const onChangeDeviceFormValueByPath = (path, value) => ({
  type: 'DEV_UPDATE_FORM_VALUE_BY_PATH',
  payload: { path, value },
});

export const setAddDeviceForm = (path, value) => ({ type: 'DEV_UPDATE_FORM', payload: { path, value } });

// Изменение отображния модального окна ModalDeregisterDevice
export const setModalDeregisterVisible = (value) => ({
  type: 'DEREGISTER_FORM_VISIBLE',
  payload: { value },
});

// Изменение отображния модального окна ModalDeregisterDevice
export const updateModalDeregisterForm = (path, value) => ({
  type: 'DEREGISTER_FORM_UPDATE',
  payload: { path, value },
});


export const onChangeObjectFormValueByPath = (path, value) => ({
  type: 'OBJECT_UPDATE_FORM_VALUE_BY_PATH',
  payload: { path, value },
});

export const setObjectForm = (path, value) => ({ type: 'OBJECT_UPDATE_FORM', payload: { path, value } });