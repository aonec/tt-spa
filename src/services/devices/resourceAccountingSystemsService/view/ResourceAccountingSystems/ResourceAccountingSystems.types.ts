import { NodeOnHousingStockResponse } from 'myApi';

export type ResourceAccountingSystemsProps = {
  nodes: NodeOnHousingStockResponse[] | null;
  isLoading: boolean;
  openDevicesListModal: (payload: NodeOnHousingStockResponse) => void;
};

export type ResourceAccountingSystemsSegment = 'resource' | 'calculator';
