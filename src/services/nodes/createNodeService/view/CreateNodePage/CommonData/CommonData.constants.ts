import { ENodeCommercialAccountStatus, ENodeRegistrationType } from 'api/types';
import { NodeStatusIconsDictionary } from 'services/devices/resourceAccountingSystemsService/view/ResourceAccountingSystems/NodesGroup/NodeItem/NodeStatus/NodeStatus.constants';
import { NodeStatusesList } from './CommonData.types';
import * as Yup from 'yup';
import { NodeStatusTextDictionary } from 'dictionaries';

export const commercialNodeStatuses: NodeStatusesList = Object.values(
  ENodeCommercialAccountStatus,
).map((nodeStatus) => ({
  nodeStatus,
  text: NodeStatusTextDictionary[nodeStatus],
  Icon: NodeStatusIconsDictionary[nodeStatus],
}));

export const pipeValidationSchema = Yup.object().shape({
  number: Yup.number()
    .min(1, 'Номер трубы должен быть не меньше 1')
    .max(10, 'Номер трубы должен быть не больше 10')
    .required('Укажите номер для трубы'),
  diameter: Yup.number()
    .required('Укажите диаметр для трубы')
    .min(15, 'Диаметр трубы должен быть не меньше 15'),
});

export const validationSchema = Yup.object().shape({
  configuration: Yup.string().nullable().required('Это поле обязательное'),
  registrationType: Yup.string().nullable().required('Это поле обязательное'),
  nodeServiceZoneId: Yup.string().nullable().required('Это поле обязательное'),
  number: Yup.string().required('Это поле обязательное'),
  communicationPipes: Yup.array().of(pipeValidationSchema),
  commercialStatusRequest: Yup.object()
    .nullable()
    .when('registrationType', {
      is: ENodeRegistrationType.Commercial,
      then: Yup.object().shape({
        commercialStatus: Yup.string()
          .nullable()
          .required('Укажите коммерческий статус узла'),
        documentId: Yup.string()
          .nullable()
          .when('commercialStatus', {
            is: ENodeCommercialAccountStatus.Registered,
            then: Yup.string().nullable().required('Прикрепите документ'),
          }),
        startCommercialAccountingDate: Yup.string()
          .nullable()
          .when('commercialStatus', {
            is: ENodeCommercialAccountStatus.Registered,
            then: Yup.string()
              .nullable()
              .required('Укажите дату начала действия акта-допуска'),
          }),

        endCommercialAccountingDate: Yup.string()
          .nullable()
          .when('commercialStatus', {
            is: ENodeCommercialAccountStatus.Registered,
            then: Yup.string()
              .nullable()
              .required('Укажите дату окончания действия акта-допуска'),
          }),
      }),
    }),
});
