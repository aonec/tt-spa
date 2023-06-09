import { NodeOnHousingStockResponse } from 'myApi';
import { ResourceAccountingSystemsSegment } from '../../ResourceAccountingSystems.types';

export type NodeItemProps = {
  node: NodeOnHousingStockResponse;
  segmentName: ResourceAccountingSystemsSegment;
  openDevicesListModal: (payload: NodeOnHousingStockResponse) => void;
};