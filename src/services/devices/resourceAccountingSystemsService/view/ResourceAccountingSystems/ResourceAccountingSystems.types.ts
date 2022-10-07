import { NodeOnHousingStockResponse } from 'myApi';

export type ResourceAccountingSystemsProps = {
  nodes: NodeOnHousingStockResponse[] | null;
  isLoading: boolean;
};

export type ResourceAccountingSystemsSegment = 'resource' | 'calculator';
