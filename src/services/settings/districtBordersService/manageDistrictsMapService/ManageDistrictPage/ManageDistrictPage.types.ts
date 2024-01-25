import { DistrictResponse } from 'api/types';
import { OrganizationCoordinates } from 'services/currentOrganizationService/currentOrganizationService.types';

export type Props = {
  existingDistricts: DistrictResponse[] | null;
  handleDeleteDistrict: (id: string) => void;
  organizationCoordinates: OrganizationCoordinates | null;
  districtsPageSegment: DistrictsPageSegment;
  setDistrictsPageSegment: (payload: DistrictsPageSegment) => void;
  isDistrictLoading: boolean;
};

export type DistrictsPageSegment = 'list' | 'map';
