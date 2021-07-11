import * as Yup from 'yup';
import { string } from 'yup';

const yupSerialNumber = Yup.string()
  .min(3, 'Серийный номер должен быть длиннее трех символов')
  .required('Введите серийный номер');
const yupInfoId = Yup.number()
  .typeError('Выберите модель')
  .required('Выберите модель');
const yupEntryNumber = Yup.number()
  .min(0)
  .max(10, 'Укажите число до 10')
  .typeError('Введите число, значение не может быть пустым')
  .required('Введите номер');
const yupPipeNumber = Yup.number()
  .min(0)
  .max(10, 'Укажите число до 10')
  .typeError('Введите число, значение не может быть пустым')
  .required('Введите номер');
const yupCalculatorId = Yup.number()
  .typeError('Вы не выбрали вычислитель')
  .required('Выберите вычислитель');
const yupDiameter = Yup.number()
  .min(1, 'от 1')
  .max(150, 'до 150')
  .typeError('Нельзя оставлять пустое значение')
  .required('Введите число от 1');
const yupModel = Yup.string()
  .min(3, 'Модель должна быть длиннее трех символов')
  .required('Введите модель');

const yupHousingMeteringDeviceType = Yup.string().required(
  'Выберите тип устройства',
);

export const validationSchemaFlowMeter = Yup.object({
  housingMeteringDeviceType: yupHousingMeteringDeviceType,
  model: yupModel,
  serialNumber: yupSerialNumber,
  // calculatorId: yupCalculatorId,
  // entryNumber: yupEntryNumber,
  pipeNumber: yupPipeNumber,
  diameter: yupDiameter,
});
export const validationSchemaTemperatureSensor = Yup.object({
  housingMeteringDeviceType: yupHousingMeteringDeviceType,
  model: yupModel,
  serialNumber: yupSerialNumber,
  // calculatorId: yupCalculatorId,
  // entryNumber: yupEntryNumber,
  pipeNumber: yupPipeNumber,
});
