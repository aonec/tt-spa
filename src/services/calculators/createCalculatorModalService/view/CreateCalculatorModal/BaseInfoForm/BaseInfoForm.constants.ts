import { checkingDateTest } from 'services/devices/individualDevices/workWithIndividualDeviceService/workWithIndividualDeviceService.utils';
import * as yup from 'yup';

export const validationSchema = yup.object().shape({
  serialNumber: yup.string().required('Это поле обязательно'),
  infoId: yup.number().required('Это поле обязательно'),
  lastCheckingDate: yup
    .string()
    .nullable()
    .test('checking-date-down', 'некорректная дата', checkingDateTest),
  futureCheckingDate: yup
    .string()
    .nullable()
    .test('checking-date-down', 'некорректная дата', checkingDateTest),
});
