import { HousingStockListResponse } from 'myApi';

export type CreateDistrictFormPanelProps = {
  isLoadingHousingStocks: boolean;
  housingStocksInDistrict: HousingStockListResponse[];
};
