import { HousingStockListResponse } from 'myApi';

export type ObjectsListProps = {
  isLoading: boolean;
  housingStocks?: HousingStockListResponse[] | null;
};
