import {
  ESecuredIdentityRoleName,
  OrganizationUserCreateRequest,
} from 'api/types';

export type CreateEmployeeFormProps = {
  formId: string;
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
