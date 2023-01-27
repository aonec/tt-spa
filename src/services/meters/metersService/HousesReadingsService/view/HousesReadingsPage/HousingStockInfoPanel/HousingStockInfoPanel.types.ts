import { HousingStockResponse, InspectorResponse } from 'myApi';

export type HousingStockInfoPanelProps = {
  housingStock: HousingStockResponse;
  inspector: InspectorResponse | null;
};
