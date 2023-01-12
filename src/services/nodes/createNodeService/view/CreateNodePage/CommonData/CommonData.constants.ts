import {
  ENodeCommercialAccountStatus,
  ENodeRegistrationType,
  EResourceType,
} from 'myApi';
import {
  NodeStatusIconsDictionary,
  NodeStatusTextDictionary,
} from 'services/devices/resourceAccountingSystemsService/view/ResourceAccountingSystems/NodesGroup/NodeItem/NodeStatus/NodeStatus.constants';
import { NodeResourcesList, NodeStatusesList } from './CommonData.types';
import * as Yup from 'yup';

export const nodeResources: NodeResourcesList = [
  {
    resource: EResourceType.ColdWaterSupply,
    text: 'ХВС',
  },
  {
    resource: EResourceType.HotWaterSupply,
    text: 'ГВС',
  },
  {
    resource: EResourceType.Heat,
    text: 'Тепло',
  },
];

export const commercialNodeStatuses: NodeStatusesList = Object.values(
  ENodeCommercialAccountStatus
).map((nodeStatus) => ({
  nodeStatus,
  text: NodeStatusTextDictionary[nodeStatus],
  Icon: NodeStatusIconsDictionary[nodeStatus],
}));

export const validationSchema = Yup.object().shape({
  resource: Yup.string().nullable().required('Это поле обязательное'),
  nodeStatus: Yup.string().nullable().required('Это поле обязательное'),
  nodeServiceZoneId: Yup.string().nullable().required('Это поле обязательное'),
  number: Yup.string().required('Это поле обязательное'),
  commercialStatus: Yup.string()
    .nullable()
    .when('nodeStatus', {
      is: ENodeRegistrationType.Commercial,
      then: Yup.string().required('Это поле обязательное'),
    }),
});

export const nodeStatuses = {
  [ENodeRegistrationType.Commercial]: 'Коммерческий',
  [ENodeRegistrationType.Technical]: 'Технический',
};
