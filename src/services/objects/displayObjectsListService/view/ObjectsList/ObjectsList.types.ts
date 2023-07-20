import { BuildingListResponse } from 'api/myApi';

export type ObjectsListProps = {
  isLoading: boolean;
  housingStocks?: BuildingListResponse[] | null;
};
