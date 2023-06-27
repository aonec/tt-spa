import { DistrictResponse, HousingStockListResponsePagedList } from 'myApi';

export type Props = {
  existingHousingStocks: HousingStockListResponsePagedList | null;
  existingDistricts: DistrictResponse[] | null;
  isLoading: boolean;
};
