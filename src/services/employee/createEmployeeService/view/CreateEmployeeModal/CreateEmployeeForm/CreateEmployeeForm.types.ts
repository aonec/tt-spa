import { ESecuredIdentityRoleName, OrganizationUserCreateRequest } from 'myApi';

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
