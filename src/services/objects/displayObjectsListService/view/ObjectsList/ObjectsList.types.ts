import { BuildingListResponse } from 'myApi';

export type ObjectsListProps = {
  isLoading: boolean;
  housingStocks?: BuildingListResponse[] | null;
};
