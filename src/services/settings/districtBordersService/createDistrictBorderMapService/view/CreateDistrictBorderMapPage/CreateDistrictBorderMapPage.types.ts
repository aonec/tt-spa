import {
  BuildingListResponsePagedList,
  DistrictCreateRequest,
  DistrictResponse,
} from 'api/myApi';
import { CreatingDistrictPayload } from '../../createDistrictBorderMapService.types';
import { OrganizationCoordinates } from 'services/currentUserService/currentUserService.types';

export type Props = {
  existingHousingStocks: BuildingListResponsePagedList | null;
  existingDistricts: DistrictResponse[] | null;
  isLoading: boolean;
  handleCreateDistrict: (payload: DistrictCreateRequest) => void;
  preselectedDistrictPayload: CreatingDistrictPayload | null;
  organizationCoordinates: OrganizationCoordinates | null;
};
