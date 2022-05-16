import { InspectorOnHousingStockResponse, InspectorResponse } from 'myApi';
import {
  CurrentHousingStockUpdate,
  PatchHousingStockInspectorInfoPayload,
} from '../inspectorHousingStockService/inspectorHousingStockService.types';

export type InspectorsHosuingsStocksListProps = {
  housingStocks: InspectorOnHousingStockResponse[] | null;
  inspectors: InspectorResponse[] | null;
  days: number[];
  loading: boolean;
  updateHousingStock: (
    updatedData: PatchHousingStockInspectorInfoPayload
  ) => void;
  updates: CurrentHousingStockUpdate[];
};
