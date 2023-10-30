import * as yup from 'yup';

export const validationSchema = yup.object().shape({
  sourceId: yup.string().nullable().required('Обязательное поле'),
  requestDate: yup.string().nullable().required('Обязательное поле'),
  requestTime: yup.string().nullable().required('Обязательное поле'),
  selectedObjectAddress: yup.string().nullable().required('Обязательное поле'),
  apartmentNumber: yup.string().nullable().required('Обязательное поле'),
  // taskType: yup.string().nullable().required('Обязательное поле'),
  // taskReasonOrderNumber: yup.number().nullable().required('Обязательное поле'),
  requestNumber: yup
    .string()
    .nullable()
    .when('isSourceNumberRequired', {
      is: true,
      then: yup.string().nullable().required('Обязательное поле'),
    }),
  subscriberName: yup
    .string()
    .nullable()
    .when('isSubscriberRequired', {
      is: true,
      then: yup.string().nullable().required('Обязательное поле'),
    }),
  phoneNumber: yup
    .string()
    .nullable()
    .when('isSubscriberRequired', {
      is: true,
      then: yup.string().nullable().required('Обязательное поле'),
    }),
  taskDeadlineDate: yup
    .string()
    .nullable()
    .when('isManualDeadlineRequired', {
      is: true,
      then: yup.string().nullable().required('Обязательное поле'),
    }),
});
