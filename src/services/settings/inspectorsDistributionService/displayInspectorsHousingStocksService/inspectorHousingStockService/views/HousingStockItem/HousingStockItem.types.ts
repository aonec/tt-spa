import {
  InspectorOnBuildingResponse,
  InspectorResponse,
  UpdateInspectorOnBuildingRequest,
} from 'api/types';
import { CurrentHousingStockUpdate } from '../../inspectorHousingStockService.types';

export type HousingStockItemProps = {
  housingStock: InspectorOnBuildingResponse;
  inspectors: InspectorResponse[] | null;
  days: number[];
  updateHousingStock: (updatedData: UpdateInspectorOnBuildingRequest) => void;
  updateInfo?: CurrentHousingStockUpdate;
};
