import { NodeOnHousingStockResponse } from 'myApi';

export type ResourceAccountingSystemsProps = {
  nodes: NodeOnHousingStockResponse[] | null;
  isLoading: boolean;
  openDevicesListModal: (payload: number) => number;
};

export type ResourceAccountingSystemsSegment = 'resource' | 'calculator';
