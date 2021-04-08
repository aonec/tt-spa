import * as Yup from 'yup';

export const validationSchemaFlowMeter = Yup.object({
  isAllowed: Yup.boolean().oneOf([true], 'Field must be checked'),
  model: Yup.string()
    .min(3, 'Модель должна быть длиннее трех символов')
    .required('Введите модель'),
  serialNumber: Yup.string()
    .min(3, 'Серийный номер должен быть длиннее трех символов')
    .required('Введите серийный номер'),
  calculatorId: Yup.number()
    .typeError('Вы не выбрали вычислитель')
    .required('Выберите вычислитель'),
  pipeNumber: Yup.number()
    .min(0)
    .max(10, 'Укажите число до 10')
    .typeError('Введите число, значение не может быть пустым')
    .required('Введите номер'),
  diameter: Yup.number()
    .min(1, 'от 1')
    .max(150, 'до 150')
    .typeError('Нельзя оставлять пустое значение')
    .required('Введите число от 1'),
});

export const validationSchemaTemperatureSensor = Yup.object({
  model: Yup.string()
    .min(3, 'Модель должна быть длиннее трех символов')
    .required('Введите модель'),
  serialNumber: Yup.string()
    .min(3, 'Серийный номер должен быть длиннее трех символов')
    .required('Введите серийный номер'),
  calculatorId: Yup.number()
    .typeError('Вы не выбрали вычислитель')
    .required('Выберите вычислитель'),
  entryNumber: Yup.number()
    .min(0)
    .max(10, 'Укажите число до 10')
    .typeError('Введите число, значение не может быть пустым')
    .required('Введите номер'),
  pipeNumber: Yup.number()
    .min(0)
    .max(10, 'Укажите число до 10')
    .typeError('Введите число, значение не может быть пустым')
    .required('Введите номер'),
});
