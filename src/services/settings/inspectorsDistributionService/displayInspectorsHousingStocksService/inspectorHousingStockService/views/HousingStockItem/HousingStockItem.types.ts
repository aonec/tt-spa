import {
  InspectorOnBuildingResponse,
  InspectorResponse,
  UpdateInspectorOnBuildingRequest,
} from 'myApi';
import { CurrentHousingStockUpdate } from '../../inspectorHousingStockService.types';

export type HousingStockItemProps = {
  housingStock: InspectorOnBuildingResponse;
  inspectors: InspectorResponse[] | null;
  days: number[];
  updateHousingStock: (updatedData: UpdateInspectorOnBuildingRequest) => void;
  updateInfo?: CurrentHousingStockUpdate;
};
