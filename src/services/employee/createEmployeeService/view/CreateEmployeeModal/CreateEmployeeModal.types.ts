import { ESecuredIdentityRoleName, OrganizationUserCreateRequest } from 'myApi';

export type CreateEmployeeModalProps = {
  isModalOpen: boolean;
  handleCloseModal: () => void;
  multipleSelectionCompetences:
    | {
        label: string | null;
        value: string;
      }[]
    | null;
  multipleSelectionUserRoles:
    | {
        label: string | null | undefined;
        value: ESecuredIdentityRoleName | undefined;
      }[]
    | null;
  handleCreateEmloyee: (payload: OrganizationUserCreateRequest) => void;
};
