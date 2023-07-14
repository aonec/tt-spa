import {
  BuildingListResponsePagedList,
  DistrictCreateRequest,
  DistrictResponse,
} from 'myApi';
import { CreatingDistrictPayload } from '../../createDistrictBorderMapService.types';

export type Props = {
  existingHousingStocks: BuildingListResponsePagedList | null;
  existingDistricts: DistrictResponse[] | null;
  isLoading: boolean;
  handleCreateDistrict: (payload: DistrictCreateRequest) => void;
  preselectedDistrictPayload: CreatingDistrictPayload | null;
};
