import { NodeOnHousingStockResponse } from 'myApi';

export type ResourceAccountingSystemsProps = {
  nodes: NodeOnHousingStockResponse[] | null;
};

export type ResourceAccountingSystemsSegment = 'resource' | 'calculator';
