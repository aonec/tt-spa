import {
  InspectorOnBuildingResponse,
  UpdateInspectorOnBuildingRequest,
} from 'api/types';

export type HousingStockItemContainerProps = {
  housingStock: InspectorOnBuildingResponse;
};

export type PatchHousingStockInspectorInfoPayload = {
  housingStockId: number;
  data: UpdateInspectorOnBuildingRequest;
};

export type CurrentHousingStockUpdate = {
  housingStockId: number;
  status?: 'loading' | 'failed';
};
