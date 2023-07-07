import {
  BuildingListResponsePagedList,
  DistrictCreateRequest,
  DistrictResponse,
} from 'myApi';

export type Props = {
  existingHousingStocks: BuildingListResponsePagedList | null;
  existingDistricts: DistrictResponse[] | null;
  isLoading: boolean;
  handleCreateDistrict: (payload: DistrictCreateRequest) => void;
};
