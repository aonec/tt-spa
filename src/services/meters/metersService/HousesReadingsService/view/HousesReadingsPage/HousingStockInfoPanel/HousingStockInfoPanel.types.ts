import { HousingStockResponse, InspectorResponse } from 'api/myApi';

export type HousingStockInfoPanelProps = {
  housingStock: HousingStockResponse;
  inspector: InspectorResponse | null;
};
