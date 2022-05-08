import {
  InspectorOnHousingStockResponse,
  InspectorResponse,
  UpdateInspectorOnHousingStockRequest,
} from 'myApi';
import { CurrentHousingStockUpdate } from '../../types';

export type HousingStockItemProps = {
  housingStock: InspectorOnHousingStockResponse;
  inspectors: InspectorResponse[] | null;
  days: number[];
  updateHousingStock: (
    updatedData: UpdateInspectorOnHousingStockRequest
    ) => void;
    update?: CurrentHousingStockUpdate;
};
