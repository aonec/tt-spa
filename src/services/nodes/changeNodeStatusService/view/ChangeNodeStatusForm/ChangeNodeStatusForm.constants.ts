import { ENodeCommercialAccountStatus } from 'api/types';
import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  commercialStatus: Yup.string().nullable().required('Это поле обязательное'),
  documentId: Yup.string()
    .nullable()
    .when('commercialStatus', {
      is: () => ENodeCommercialAccountStatus.Registered,
      then: (schema) => schema.nullable().required('Это поле обязательное'),
    }),
  firstDate: Yup.string().nullable().required('Это поле обязательное'),
  secondDate: Yup.string()
    .nullable()
    .when('commercialStatus', {
      is: ENodeCommercialAccountStatus.Registered,
      then: (schema) => schema.nullable().required('Это поле обязательное'),
    }),
});

export const createNodeStatusValidationSchema = Yup.object().shape({
  commercialStatus: Yup.string().nullable().required('Это поле обязательное'),
  firstDate: Yup.string().required('Это поле обязательное'),
});

export const DocumentUploaderLabels = {
  [ENodeCommercialAccountStatus.NotRegistered]:
    'Добавьте акт снятия с коммерческого учёта',
  [ENodeCommercialAccountStatus.Registered]: 'Добавьте акт-допуска',
};

export const NodeStatusDateLabel: {
  [key in ENodeCommercialAccountStatus]: string;
} = {
  [ENodeCommercialAccountStatus.NotRegistered]: 'Дата снятия',
  [ENodeCommercialAccountStatus.OnReview]: 'Дата смены статуса',
  [ENodeCommercialAccountStatus.Prepared]: 'Дата смены статуса',
  [ENodeCommercialAccountStatus.Registered]: 'Дата начала действия',
};
