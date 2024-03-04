import { checkingDateTest } from 'services/devices/individualDevices/workWithIndividualDeviceService/workWithIndividualDeviceService.utils';
import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  model: Yup.string().required('Это поле обязательное'),
  serialNumber: Yup.string().required('Это поле обязательное'),
  pipeId: Yup.string().nullable().required('Это поле обязательное'),
  lastCheckingDate: Yup.string()
    .nullable()
    .test('checking-date-down', 'некорректная дата', checkingDateTest)
    .required('Обязательное поле'),
  futureCheckingDate: Yup.string()
    .nullable()
    .test('checking-date-down', 'некорректная дата', checkingDateTest)
    .required('Обязательное поле'),
});
