import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  calculatorId: Yup.number().required('Это поле обязательное'),
  entryNumber: Yup.number().required('Это поле обязательное'),
});
