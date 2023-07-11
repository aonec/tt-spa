import {
  DistrictCreateRequest,
  DistrictResponse,
  HousingStockListResponsePagedList,
} from 'myApi';
import { CreatingDistrictPayload } from '../../createDistrictBorderMapService.types';

export type Props = {
  existingHousingStocks: HousingStockListResponsePagedList | null;
  existingDistricts: DistrictResponse[] | null;
  isLoading: boolean;
  handleCreateDistrict: (payload: DistrictCreateRequest) => void;
  preselectedDistrictPayload: CreatingDistrictPayload | null;
};
