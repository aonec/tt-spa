import { BuildingListResponsePagedList, DistrictResponse } from 'api/types';
import { OrganizationCoordinates } from 'services/currentUserService/currentUserService.types';

export type Props = {
  districtId: string;
  organizationCoordinates: OrganizationCoordinates | null;
  existingHousingStocks: BuildingListResponsePagedList | null;
  existingDistricts: DistrictResponse[] | null;
  isLoadingHousingStocks: boolean;
  isLoadingDistricts: boolean;
  isLoadingUpdateDistrict: boolean;
  handleUpdateDistrictBorder: (coordinates: number[][]) => void;
};
