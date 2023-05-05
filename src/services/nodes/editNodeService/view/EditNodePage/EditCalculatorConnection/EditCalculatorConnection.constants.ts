import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  calculatorId: Yup.number().nullable(),
  entryNumber: Yup.number().when('calculatorId', {
    is: (id) => Boolean(id),
    then: Yup.number().required('Это поле обязательное'),
  }),
});
