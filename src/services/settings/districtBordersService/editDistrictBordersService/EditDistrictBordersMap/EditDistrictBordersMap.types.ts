import {
  BuildingWithCoordinatesResponsePagedList,
  DistrictResponse,
} from 'api/types';
import { OrganizationCoordinates } from 'services/currentOrganizationService/currentOrganizationService.types';

export type Props = {
  districtId: string;
  organizationCoordinates: OrganizationCoordinates | null;
  existingHousingStocks: BuildingWithCoordinatesResponsePagedList | null;
  existingDistricts: DistrictResponse[] | null;
  isLoadingHousingStocks: boolean;
  isLoadingDistricts: boolean;
  isLoadingUpdateDistrict: boolean;
  handleUpdateDistrictBorder: (coordinates: number[][]) => void;
};
