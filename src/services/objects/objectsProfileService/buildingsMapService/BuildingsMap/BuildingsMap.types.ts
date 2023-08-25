import { BuildingListResponsePagedList } from 'api/types';

export type Props = {
  isLoading: boolean;
  existingHousingStocks: BuildingListResponsePagedList | null;
};
