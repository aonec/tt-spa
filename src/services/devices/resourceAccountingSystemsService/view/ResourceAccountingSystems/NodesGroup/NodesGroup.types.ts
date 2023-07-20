import { NodeOnHousingStockResponse } from 'api/myApi';
import { ResourceAccountingSystemsSegment } from '../ResourceAccountingSystems.types';

export type NodesGroupProps = {
  segmentName: ResourceAccountingSystemsSegment;
  nodes: NodeOnHousingStockResponse[];
  groupKey: string;
  openDevicesListModal: (payload: NodeOnHousingStockResponse) => void;
};
