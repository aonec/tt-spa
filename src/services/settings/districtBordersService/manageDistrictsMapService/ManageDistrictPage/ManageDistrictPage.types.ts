import { DistrictResponse } from 'api/types';
import { OrganizationCoordinates } from 'services/currentUserService/currentUserService.types';

export type Props = {
  existingDistricts: DistrictResponse[] | null;
  handleDeleteDistrict: (id: string) => void;
  organizationCoordinates: OrganizationCoordinates | null;
  districtsPageSegment: DistrictsPageSegment;
  setDistrictsPageSegment: (payload: DistrictsPageSegment) => void;
};

export type DistrictsPageSegment = 'list' | 'map';
