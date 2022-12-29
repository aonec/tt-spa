import { HousingStockResponse, InspectorResponse } from 'myApi';
import { GetHousingStocksListRequestPayload } from '../../HousesReadingsService.types';

export type HousesReadingsPageProps = {
  housingStock: HousingStockResponse | null;
  handleSearchHousingStock: (
    payload: GetHousingStocksListRequestPayload
  ) => void;
  isLoadingHousingStock: boolean;
  inspector: InspectorResponse | null;
};
