import { HousingStockListResponse } from 'myApi';

export type CreateDistrictBorderMapPageProps = {
  isLoadingHousingStocks: boolean;
  housingStocksList: HousingStockListResponse[];
};

export const ymaps = window.ymaps;
