import { DistrictResponse } from 'api/types';
import { OrganizationCoordinates } from 'services/currentOrganizationService/currentOrganizationService.types';

export type Props = {
  organizationCoordinates: OrganizationCoordinates | null;
  existingDistricts: DistrictResponse[] | null;
  handleDeleteDistrict: (id: string) => void;
};
