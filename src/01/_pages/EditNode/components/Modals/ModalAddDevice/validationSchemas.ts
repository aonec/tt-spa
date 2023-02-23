import * as Yup from 'yup';

const yupSerialNumber = Yup.string()
  .min(3, 'Серийный номер должен быть длиннее трех символов')
  .required('Введите серийный номер');
const yupModel = Yup.string()
  .min(3, 'Модель должна быть длиннее трех символов')
  .required('Введите модель');

const yupHousingMeteringDeviceType = Yup.string().required(
  'Выберите тип устройства',
);
const yupCommunicationPipeId = Yup.number().required('Выберите трубу');

export const validationSchemaHousingMeteringDevice = Yup.object({
  housingMeteringDeviceType: yupHousingMeteringDeviceType,
  model: yupModel,
  serialNumber: yupSerialNumber,
  communicationPipeId: yupCommunicationPipeId,
});
