import { HousingStockListResponse } from "../../../../../api/types";

export type ObjectsListProps = {
  isLoading: boolean;
  housingStocks?: HousingStockListResponse[] | null;
};
