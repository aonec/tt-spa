import * as yup from 'yup';
import { WorkWithIndividualDeviceType } from '../../../workWithIndividualDeviceService.types';
import { checkingDateTest } from '../../../workWithIndividualDeviceService.utils';

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
  serialNumber: yup.string().required('Это поле обязательное'),
  rateType: yup.string().required('Это поле обязательное'),

  lastCheckingDate: yup
    .string()
    .when('lastCheckingDate', {
      is: checkingDateTest,
      then: yup.number().required('Это поле обязательно'),
    })
    .required('Это поле обязательное'),

  dayFeedBackFlowTemperature: yup
    .number()
    .max(200, 'превышает 200°')
    .min(0, 'ниже 0°')
    .when('dayFeedFlowTemperature', (value) => {
      if (value) {
        return yup
          .number()
          .max(200, 'превышает 200°')
          .min(0, 'ниже 0°')
          .lessThan(value, 'Выше подающей');
      }
    })
    .required('Это поле обязательное'),
});
