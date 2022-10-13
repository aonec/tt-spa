import { NodeOnHousingStockResponse } from 'myApi';
import { ResourceAccountingSystemsSegment } from '../ResourceAccountingSystems.types';

export type NodesGroupProps = {
  segmentName: ResourceAccountingSystemsSegment;
  nodes: NodeOnHousingStockResponse[];
  groupKey: string;
};
