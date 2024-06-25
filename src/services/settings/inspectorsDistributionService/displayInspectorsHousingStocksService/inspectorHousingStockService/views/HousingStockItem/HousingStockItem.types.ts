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
  handleOpenAddInspector: (payload: number | null) => void;
  updateInfo?: CurrentHousingStockUpdate;
  handleDeleteInspector: (id: number) => void;
};
