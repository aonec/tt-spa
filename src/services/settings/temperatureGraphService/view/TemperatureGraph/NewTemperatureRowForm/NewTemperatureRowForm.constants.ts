import * as yup from 'yup';

export const validationSchema = yup.object().shape({
  outdoorTemperature: yup
    .number()
    .max(99, 'превышает 99°')
    .min(-99, 'ниже -99°')
    .required('Это поле обязательное'),
  dayFeedFlowTemperature: yup
    .number()
    .max(200, 'превышает 200°')
    .min(0, 'ниже 0°')
    .required('Это поле обязательное'),
  nightFeedFlowTemperature: yup
    .number()
    .max(200, 'превышает 200°')
    .min(0, 'ниже 0°')
    .required('Это поле обязательное'),
  heatFeedFlowTemperature: yup
    .number()
    .max(200, 'превышает 200°')
    .min(0, 'ниже 0°')
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
  nightFeedBackFlowTemperature: yup
    .number()
    .max(200, 'превышает 200°')
    .min(0, 'ниже 0°')
    .when('nightFeedFlowTemperature', (value) => {
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
