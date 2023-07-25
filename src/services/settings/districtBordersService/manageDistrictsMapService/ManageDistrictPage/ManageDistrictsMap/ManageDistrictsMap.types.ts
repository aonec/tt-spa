import { DistrictResponse } from 'api/types';
import { OrganizationCoordinates } from 'services/currentUserService/currentUserService.types';

export type Props = {
  organizationCoordinates: OrganizationCoordinates | null;
  existingDistricts: DistrictResponse[] | null;
  setSelectedDistrictId: (id: string) => void;
  selectedDistrictId: string | null;
};
