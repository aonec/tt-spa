import { NodeOnHousingStockResponse } from 'api/types';

export type ResourceAccountingSystemsProps = {
  nodes: NodeOnHousingStockResponse[] | null;
  isLoading: boolean;
  openDevicesListModal: (payload: NodeOnHousingStockResponse) => void;
};

export type ResourceAccountingSystemsSegment = 'resource' | 'calculator';
