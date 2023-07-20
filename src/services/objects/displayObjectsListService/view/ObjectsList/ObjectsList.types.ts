import { BuildingListResponse } from 'api/types';

export type ObjectsListProps = {
  isLoading: boolean;
  housingStocks?: BuildingListResponse[] | null;
};
