import { BuildingListResponsePagedList, DistrictResponse } from 'api/types';
import { OrganizationCoordinates } from 'services/currentUserService/currentUserService.types';

export type Props = {
  organizationCoordinates: OrganizationCoordinates | null;
  existingHousingStocks: BuildingListResponsePagedList | null;
  existingDistricts: DistrictResponse[] | null;
  isLoadingHousingStocks: boolean;
  isLoadingDistricts: boolean;
};
