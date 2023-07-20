import { InspectorOnBuildingResponse, InspectorResponse } from 'api/myApi';
import {
  CurrentHousingStockUpdate,
  PatchHousingStockInspectorInfoPayload,
} from '../inspectorHousingStockService/inspectorHousingStockService.types';

export type InspectorsHosuingsStocksListProps = {
  housingStocks: InspectorOnBuildingResponse[] | null;
  inspectors: InspectorResponse[] | null;
  days: number[];
  loading: boolean;
  updateHousingStock: (
    updatedData: PatchHousingStockInspectorInfoPayload,
  ) => void;
  updateInfo: CurrentHousingStockUpdate[];
};
