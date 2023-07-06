import {
  DistrictCreateRequest,
  DistrictResponse,
  HousingStockListResponsePagedList,
} from 'myApi';

export type Props = {
  existingHousingStocks: HousingStockListResponsePagedList | null;
  existingDistricts: DistrictResponse[] | null;
  isLoading: boolean;
  handleCreateDistrict: (payload: DistrictCreateRequest) => void;
};
