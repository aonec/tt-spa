import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  connectionType: Yup.string().nullable().required('Это поле обязательное'),
  calculatorId: Yup.string()
    .nullable()
    .when('connectionType', {
      is: 'fsd',
      then: Yup.string().nullable().required('Это поле обязательное'),
    }),

});
