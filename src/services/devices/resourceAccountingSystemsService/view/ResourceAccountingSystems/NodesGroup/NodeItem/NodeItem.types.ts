import { NodeOnHousingStockResponse } from 'api/myApi';
import { ResourceAccountingSystemsSegment } from '../../ResourceAccountingSystems.types';

export type NodeItemProps = {
  node: NodeOnHousingStockResponse;
  segmentName: ResourceAccountingSystemsSegment;
  openDevicesListModal: (payload: NodeOnHousingStockResponse) => void;
};
