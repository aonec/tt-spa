import { ENodeRegistrationType } from 'api/types';
import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  registrationType: Yup.string().nullable().required('Это поле обязательное'),
  technicalTypeRequest: Yup.object()
    .nullable()
    .when('registrationType', {
      is: ENodeRegistrationType.Technical,
      then: (schema) =>
        schema.nullable().shape({
          commercialAccountingDeregistrationDate: Yup.string()
            .nullable()
            .required('Это поле обязательное'),
          documentId: Yup.string().nullable().required('Это поле обязательное'),
        }),
    }),
});
