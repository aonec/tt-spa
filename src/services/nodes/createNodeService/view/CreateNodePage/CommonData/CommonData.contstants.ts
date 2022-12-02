import { ENodeCommercialAccountStatus, EResourceType } from 'myApi';
import {
  NodeStatusIconsDictionary,
  NodeStatusTextDictionary,
} from 'services/devices/resourceAccountingSystemsService/view/ResourceAccountingSystems/NodesGroup/NodeItem/NodeStatus/NodeStatus.constants';
import { NodeResourcesList, NodeStatusesList } from './CommonData.types';

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

export const nodeStatuses: NodeStatusesList = Object.values(
  ENodeCommercialAccountStatus
).map((nodeStatus) => ({
  nodeStatus,
  text: NodeStatusTextDictionary[nodeStatus],
  Icon: NodeStatusIconsDictionary[nodeStatus],
}));
