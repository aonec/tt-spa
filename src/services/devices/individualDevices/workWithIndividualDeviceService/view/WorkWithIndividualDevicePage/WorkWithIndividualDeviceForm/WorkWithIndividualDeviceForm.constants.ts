import * as yup from 'yup';
import { WorkWithIndividualDeviceType } from '../../../workWithIndividualDeviceService.types';
import {
  checkingDateTest,
  compareReadingsArrWithSameIndex,
  prepareDeviceReadings,
} from '../../../workWithIndividualDeviceService.utils';
import dayjs from 'dayjs';

export const OldIndividualDeviceTitleLookup: {
  [key in WorkWithIndividualDeviceType]: string;
} = {
  [WorkWithIndividualDeviceType.check]: '',
  [WorkWithIndividualDeviceType.reopen]: 'Прибор до переоткрытия',
  [WorkWithIndividualDeviceType.switch]: 'Заменяемый прибор',
};

export const NewIndividualDeviceTitleLookup: {
  [key in WorkWithIndividualDeviceType]: string;
} = {
  [WorkWithIndividualDeviceType.check]: 'Прибор после поверки',
  [WorkWithIndividualDeviceType.reopen]: 'Прибор после переоткрытия',
  [WorkWithIndividualDeviceType.switch]: 'Новый прибор',
};

export const validationSchema = yup.object().shape({
  serialNumber: yup.string().nullable().required('Это поле обязательное'),
  rateType: yup.string().nullable().required('Это поле обязательное'),

  lastCheckingDate: yup
    .string()
    .nullable()
    .required('Это поле обязательно для заполнения')
    .test('checkingDateTest', 'Некорректная дата', (value) =>
      checkingDateTest(value),
    ),

  futureCheckingDate: yup
    .string()
    .nullable()
    .required('Это поле обязательно для заполнения')
    .test('checkingDateTest', 'Некорректная дата', (value) =>
      checkingDateTest(value),
    ),

  newDeviceReadings: yup
    .object()
    .when('type', {
      is: (type) => type === 'check',
      then: yup.object().required('Это поле обязательное'),
    })
    .test('newDeviceReadingsTest', 'ошибка 1', (value) => {
      return Boolean(
        compareReadingsArrWithSameIndex(
          Object.values(value!),
          Object.values(prepareDeviceReadings([])),
        )?.length,
      );
    }),
});
