import { ESecuredIdentityRoleName, OrganizationUserResponse } from 'api/types';
import { EditPayloud } from '../currentUserEditServiceService.types';

export type Props = {
  user: OrganizationUserResponse | null;
  multipleSelectionCompetences: {
    label: string | null;
    value: string;
  }[];
  multipleSelectionUserRoles: {
    label: string | null | undefined;
    value: ESecuredIdentityRoleName | undefined;
  }[];
  handleEdit: (payload: EditPayloud) => void;
  isLoading: boolean;
};
