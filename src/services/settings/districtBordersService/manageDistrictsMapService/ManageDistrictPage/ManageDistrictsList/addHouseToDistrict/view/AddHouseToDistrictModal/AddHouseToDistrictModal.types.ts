import { OrganizationCoordinates } from 'services/currentUserService/currentUserService.types';
import { DistrictData } from 'types';

export type Props = {
  isOpen: boolean;
  openedDistrict: DistrictData | null;
  closeAddHouseModal: () => void;
  organizationCoordinates: OrganizationCoordinates | null;
};
