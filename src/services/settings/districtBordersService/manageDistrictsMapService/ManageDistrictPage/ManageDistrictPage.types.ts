import { DistrictResponse } from 'myApi';
import { OrganizationCoordinates } from 'services/currentUserService/currentUserService.types';

export type Props = {
  existingDistricts: DistrictResponse[] | null;
  handleDeleteDistrict: () => void;
  organizationCoordinates: OrganizationCoordinates | null;
};
