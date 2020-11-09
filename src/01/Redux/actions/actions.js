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

// Изменение отображния модального окна ModalChangeOdpu
export const setModalDeregisterVisible = (value) => ({
  type: 'DEREGISTER_FORM_VISIBLE',
  payload: { value },
});

// Изменение отображния модального окна ModalChangeOdpu
export const updateModalDeregisterForm = (path, value) => ({
  type: 'DEREGISTER_FORM_UPDATE',
  payload: { path, value },
});

export const onChangeObjectFormValueByPath = (path, value) => ({
  type: 'OBJECT_UPDATE_FORM_VALUE_BY_PATH',
  payload: { path, value },
});

export const setObjectForm = (path, value) => ({ type: 'OBJECT_UPDATE_FORM', payload: { path, value } });

// Изменение отображния модального окна ModalChangeOdpu
export const setModalChangeODPUVisible = (value) => ({
  type: 'CHANGE_ODPU_FORM_VISIBLE',
  payload: { value },
});

// Изменение отображения модального окна ModalChangeOdpu
export const updateModalChangeODPUForm = (path, value) => ({
  type: 'CHANGE_ODPU_FORM_UPDATE',
  payload: { path, value },
});

// Изменение отображния модального окна ModalCalcReport
export const setModalCalcReportVisible = (value) => ({
  type: 'REPORT_FORM_VISIBLE',
  payload: { value },
});

// Изменение отображения модального окна ModalCalcReport
export const updateModalCalcReportForm = (path, value) => ({
  type: 'REPORT_FORM_UPDATE',
  payload: { path, value },
});


// Изменение отображния модального окна ModalTemplate
export const setModalTemplateVisible = (path,value) => ({
  type: 'MODAL_TEMPLATE_FORM_VISIBLE',
  payload: { path, value },
});

// Изменение отображния модального окна ModalCalculatorReport
export const setModalCalculatorReportVisible = (path,value) => ({
  type: 'MODAL_CALCULATOR_REPORT_FORM_VISIBLE',
  payload: { path, value },
});
