import { EIndividualDeviceRateType } from 'api/types';
import dayjs from 'dayjs';
import * as yup from 'yup';

export const validationSchema = yup.object().shape({
  serialNumber: yup.string().required('Это поле обязательно'),
  lastCheckingDate: yup
    .string()
    .nullable()
    .test('checking-date-down', 'Дата должна быть позднее 2000', (data) =>
      data ? dayjs(data).year() >= 2000 : true,
    )
    .required('Это поле обязательно'),
  futureCheckingDate: yup.string().nullable().required('Это поле обязательно'),
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
      then: yup.number().required('Это поле обязательно'),
    })
    .when('rateType', {
      is: EIndividualDeviceRateType.ThreeZone,
      then: yup.number().required('Это поле обязательно'),
    }),
  startupReadings3: yup
    .number()
    .nullable()
    .when('rateType', {
      is: EIndividualDeviceRateType.ThreeZone,
      then: yup.number().required('Это поле обязательно'),
    }),

  defaultReadings1: yup.number().nullable().required('Это поле обязательно'),
  defaultReadings2: yup
    .number()
    .nullable()
    .when('rateType', {
      is: EIndividualDeviceRateType.TwoZone,
      then: yup.number().required('Это поле обязательно'),
    })
    .when('rateType', {
      is: EIndividualDeviceRateType.ThreeZone,
      then: yup.number().required('Это поле обязательно'),
    }),
  defaultReadings3: yup
    .number()
    .nullable()
    .when('rateType', {
      is: EIndividualDeviceRateType.ThreeZone,
      then: yup.number().required('Это поле обязательно'),
    }),
});
