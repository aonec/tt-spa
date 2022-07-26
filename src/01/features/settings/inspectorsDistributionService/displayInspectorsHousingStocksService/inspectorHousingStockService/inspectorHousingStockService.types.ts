import {
  InspectorOnHousingStockResponse,
  UpdateInspectorOnHousingStockRequest,
} from '../../api/types';

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
