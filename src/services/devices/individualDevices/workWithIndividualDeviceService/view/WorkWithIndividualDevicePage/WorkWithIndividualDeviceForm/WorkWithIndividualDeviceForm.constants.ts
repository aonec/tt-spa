import * as yup from 'yup';
import {
  PreparedForFormReadings,
  WorkWithIndividualDeviceType,
} from '../../../workWithIndividualDeviceService.types';
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
    .nullable()
    // .when('type', {
    //   is: (type) => type === 'check',
    //   then: yup.object().required('Введите хотя бы одно показание'),
    // })
    .test(
      'newDeviceReadingsTest',
      'Это поле обязательно для заполнения',
      (value) => {
        return Boolean(
          compareReadingsArrWithSameIndex(
            Object.values(value!),
            Object.values(prepareDeviceReadings([])),
          )?.length,
        );
      },
    )
    .test(
      'newDeviceReadingsTest2',
      'Введенное показание не может быть меньше предыдущего',
      (value: any) => {
        return !Object.entries(value!)
          .map(([index, elem]) => {
            let isValid: boolean = true;

            for (let i = Number(index) + 1; i < 8; ++i) {
              const prev = value[i];
              if (!prev) {
                continue;
              }
              const { value1, value2, value3, value4 } = elem as PreparedForFormReadings;
              if (value1) {
                isValid = isValid && Number(value1) >= Number(prev.value1);
              }
              if (value2) {
                isValid = isValid && Number(value2) >= Number(prev.value2);
              }
              if (value3) {
                isValid = isValid && Number(value3) >= Number(prev.value3);
              }
              if (value4) {
                isValid = isValid && Number(value4) >= Number(prev.value4);
              }
            }

            return isValid;
          })
          .includes(false);
      },
    ),
});

// 'Введенное показание не может быть меньше предыдущего',
