import {
  BuildingWithCoordinatesResponsePagedList,
  DistrictCreateRequest,
  DistrictResponse,
} from 'api/types';
import { CreatingDistrictPayload } from '../../createDistrictBorderMapService.types';
import { OrganizationCoordinates } from 'services/currentUserService/currentUserService.types';

export type Props = {
  existingHousingStocks: BuildingWithCoordinatesResponsePagedList | null;
  existingDistricts: DistrictResponse[] | null;
  isLoading: boolean;
  handleCreateDistrict: (payload: DistrictCreateRequest) => void;
  preselectedDistrictPayload: CreatingDistrictPayload | null;
  organizationCoordinates: OrganizationCoordinates | null;
  isLoadingPostDistrict: boolean;
};
