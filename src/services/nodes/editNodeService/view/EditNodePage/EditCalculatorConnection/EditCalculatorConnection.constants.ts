import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  calculatorId: Yup.number().nullable(),
  entryNumber: Yup.number().when('calculatorId', {
    is: (id: number) => Boolean(id),
    then: (schema) => schema.required('Это поле обязательное'),
  }),
});
