import { NodeOnHousingStockResponse } from 'api/types';
import { ResourceAccountingSystemsSegment } from '../ResourceAccountingSystems.types';

export type NodesGroupProps = {
  segmentName: ResourceAccountingSystemsSegment;
  nodes: NodeOnHousingStockResponse[];
  groupKey: string;
  openDevicesListModal: (payload: NodeOnHousingStockResponse) => void;
};
