import {
  InspectorOnHousingStockResponse,
  UpdateInspectorOnHousingStockRequest,
} from 'myApi';

export type HousingStockItemContainerProps = {
  housingStock: InspectorOnHousingStockResponse;
};

export type PatchHousingStockInspectorInfoPayload = {
  housingStockId: number;
  data: UpdateInspectorOnHousingStockRequest;
};

export type CurrentHousingStockUpdate = {
  housingStockId: number;
  status?: 'loading' | 'failed';
};
