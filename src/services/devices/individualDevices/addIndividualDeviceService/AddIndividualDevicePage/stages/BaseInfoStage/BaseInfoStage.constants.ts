import { EIndividualDeviceRateType } from 'api/types';
import { checkingDateTest } from 'services/devices/individualDevices/workWithIndividualDeviceService/workWithIndividualDeviceService.utils';
import * as yup from 'yup';

export const validationSchema = yup.object().shape({
  serialNumber: yup.string().required('Это поле обязательно'),
  lastCheckingDate: yup
    .string()
    .nullable()
    .test('checking-date-down', 'некорректная дата', checkingDateTest)
    .required('Это поле обязательно'),
  futureCheckingDate: yup
    .string()
    .nullable()
    .test('checking-date-down', 'некорректная дата', checkingDateTest)
    .required('Это поле обязательно'),
  model: yup.string().required('Это поле обязательно'),
  rateType: yup.string().required('Это поле обязательно'),
  resource: yup.string().nullable().required('Это поле обязательно'),
  bitDepth: yup.number().nullable().required('Это поле обязательно'),
  scaleFactor: yup.number().nullable().required('Это поле обязательно'),
  startupReadings1: yup.number().nullable().required('Это поле обязательно'),
  startupReadings2: yup
    .number()
    .nullable()
    .when('rateType', {
      is: EIndividualDeviceRateType.TwoZone,
      then: (schema) => schema.required('Это поле обязательно'),
    })
    .when('rateType', {
      is: EIndividualDeviceRateType.ThreeZone,
      then: (schema) => schema.required('Это поле обязательно'),
    }),
  startupReadings3: yup
    .number()
    .nullable()
    .when('rateType', {
      is: EIndividualDeviceRateType.ThreeZone,
      then: (schema) => schema.required('Это поле обязательно'),
    }),

  defaultReadings1: yup.number().nullable().required('Это поле обязательно'),
  defaultReadings2: yup
    .number()
    .nullable()
    .when('rateType', {
      is: EIndividualDeviceRateType.TwoZone,
      then: (schema) => schema.required('Это поле обязательно'),
    })
    .when('rateType', {
      is: EIndividualDeviceRateType.ThreeZone,
      then: (schema) => schema.required('Это поле обязательно'),
    }),
  defaultReadings3: yup
    .number()
    .nullable()
    .when('rateType', {
      is: EIndividualDeviceRateType.ThreeZone,
      then: (schema) => schema.required('Это поле обязательно'),
    }),
});
