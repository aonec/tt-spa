import { HousingStockResponse, InspectorResponse } from 'api/types';

export type HousingStockInfoPanelProps = {
  housingStock: HousingStockResponse;
  inspector: InspectorResponse | null;
};
