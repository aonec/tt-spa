import { NodeOnHousingStockResponse } from 'api/types';
import { ResourceAccountingSystemsSegment } from '../../ResourceAccountingSystems.types';

export type NodeItemProps = {
  node: NodeOnHousingStockResponse;
  segmentName: ResourceAccountingSystemsSegment;
  openDevicesListModal: (payload: NodeOnHousingStockResponse) => void;
  index: number;
};
