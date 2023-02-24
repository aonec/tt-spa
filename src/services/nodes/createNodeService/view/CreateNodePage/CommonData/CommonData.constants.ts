import { ENodeCommercialAccountStatus, ENodeRegistrationType } from 'myApi';
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

export const validationSchema = Yup.object().shape({
  configuration: Yup.string().nullable().required('Это поле обязательное'),
  registrationType: Yup.string().nullable().required('Это поле обязательное'),
  nodeServiceZoneId: Yup.string().nullable().required('Это поле обязательное'),
  number: Yup.string().required('Это поле обязательное'),
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

export const nodeStatuses = {
  [ENodeRegistrationType.Commercial]: 'Коммерческий',
  [ENodeRegistrationType.Technical]: 'Технический',
};
