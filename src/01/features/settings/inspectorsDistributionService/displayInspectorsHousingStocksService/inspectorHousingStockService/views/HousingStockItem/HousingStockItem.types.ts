import {
  InspectorOnHousingStockResponse,
  InspectorResponse,
  UpdateInspectorOnHousingStockRequest,
} from '../../api/types';
import { CurrentHousingStockUpdate } from '../../inspectorHousingStockService.types';

export type HousingStockItemProps = {
  housingStock: InspectorOnHousingStockResponse;
  inspectors: InspectorResponse[] | null;
  days: number[];
  updateHousingStock: (
    updatedData: UpdateInspectorOnHousingStockRequest
  ) => void;
  updateInfo?: CurrentHousingStockUpdate;
};
