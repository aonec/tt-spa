import * as Yup from 'yup';

export const validationSchemaFlowMeter = Yup.object({
  lastCheckingDate: Yup.date()
    .typeError('Поле обязательное')
    .required('Поле обязательное'),
  futureCheckingDate: Yup.date()
    .typeError('Поле обязательное')
    .required('Поле обязательное'),
  lastCommercialAccountingDate: Yup.date()
    .typeError('Поле обязательное')
    .required('Введите серийный номер'),
  futureCommercialAccountingDate: Yup.date()
    .typeError('Поле обязательное')
    .required('Введите серийный номер'),
  resource: Yup.string().required('Введите данные'),
  pipeNumber: Yup.number().required('Введите число от 0'),
  entryNumber: Yup.number()
    .min(0, 'от 0')
    .typeError('Нельзя оставлять пустое значение')
    .required('Введите число от 1'),
  diameter: Yup.number()
    .min(1, 'от 1')
    .max(150, 'до 150')
    .typeError('Нельзя оставлять пустое значение')
    .required('Введите число от 1'),
  model: Yup.string()
    .min(3, 'Модель должна быть длиннее трех символов')
    .required('Введите данные'),
  serialNumber: Yup.string()
    .min(3, 'Серийный номер должен быть длиннее трех символов')
    .required('Введите данные'),
  calculatorId: Yup.string().required('Выберите вычислитель'),
});

export const validationSchemaThermoSensor = Yup.object({
  lastCheckingDate: Yup.date()
    .typeError('Поле обязательное')
    .required('Поле обязательное'),
  futureCheckingDate: Yup.date()
    .typeError('Поле обязательное')
    .required('Поле обязательное'),
  lastCommercialAccountingDate: Yup.date()
    .typeError('Поле обязательное')
    .required('Введите серийный номер'),
  futureCommercialAccountingDate: Yup.date()
    .typeError('Поле обязательное')
    .required('Введите серийный номер'),
  resource: Yup.string().required('Введите данные'),
  pipeNumber: Yup.number().required('Введите число от 0'),
  entryNumber: Yup.number()
    .min(0, 'от 0')
    .typeError('Нельзя оставлять пустое значение')
    .required('Введите число от 1'),
  model: Yup.string()
    .min(3, 'Модель должна быть длиннее трех символов')
    .required('Введите данные'),
  serialNumber: Yup.string()
    .min(3, 'Серийный номер должен быть длиннее трех символов')
    .required('Введите данные'),
  calculatorId: Yup.string().required('Выберите вычислитель'),
});
