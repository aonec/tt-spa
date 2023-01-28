import * as yup from 'yup';

export const DevicePipeMagistralDictionary: { [key: string]: string } = {
  DevicePipeMagistralDictionary: 'подающая',
  FeedBackFlow: 'обратная',
};

export const switchDeviceValidationSchema = yup.object().shape({
  housingMeteringDeviceSwitch: yup.object().shape({
    model: yup.string().required('Поле "Модель" обязателное'),
    serialNumber: yup.string().required('Поле "Серийный номер" обязателное'),
    lastCheckingDate: yup
      .string()
      .nullable()
      .test('test-date', 'Поле "Дата поверки прибора" обязателное', (value) =>
        Boolean(value)
      ),
    futureCheckingDate: yup
      .string()
      .nullable()
      .test(
        'test-date',
        'Поле "Дата следующей поверки прибора" обязателное',
        (value) => Boolean(value)
      ),
    openingDate: yup
      .string()
      .nullable()
      .test('test-date', 'Поле "Дата установки прибора" обязателное', (value) =>
        Boolean(value)
      ),
  }),
});
