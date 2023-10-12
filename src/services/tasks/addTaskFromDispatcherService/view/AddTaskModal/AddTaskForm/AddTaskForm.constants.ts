import * as yup from 'yup';

export const validationSchema = yup.object().shape({
  sourceId: yup.string().nullable().required('Обязательное поле'),
  requestDate: yup.string().nullable().required('Обязательное поле'),
  requestTime: yup.string().nullable().required('Обязательное поле'),
  executorId: yup.string().nullable().required('Обязательное поле'),
  leadId: yup.string().nullable().required('Обязательное поле'),
  selectedObjectAddress: yup.string().nullable().required('Обязательное поле'),
  taskType: yup.string().nullable().required('Обязательное поле'),
  taskReasonSearch: yup.string().nullable().required('Обязательное поле'),
  requestNumber: yup
    .string()
    .nullable()
    .when('sourceId', {
      is: '34ac5b2e-9ebd-11e8-8131-001dd8b88b72',
      then: yup.string().nullable().required('Обязательное поле'),
    }),
  subscriberName: yup
    .string()
    .nullable()
    .when('sourceId', {
      is: '34ac5b2e-9ebd-11e8-8131-001dd8b88b72',
      then: yup.string().nullable().required('Обязательное поле'),
    }),
  phoneNumber: yup
    .string()
    .nullable()
    .when('sourceId', {
      is: '34ac5b2e-9ebd-11e8-8131-001dd8b88b72',
      then: yup.string().nullable().required('Обязательное поле'),
    }),
});
