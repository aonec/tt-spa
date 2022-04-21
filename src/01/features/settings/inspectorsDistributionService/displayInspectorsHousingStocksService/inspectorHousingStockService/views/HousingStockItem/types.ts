import { InspectorOnHousingStockResponse, InspectorResponse } from 'myApi';

export type HousingStockItemProps = {
  housingStock: InspectorOnHousingStockResponse;
  inspectors: InspectorResponse[] | null;
  days: number[]
};
