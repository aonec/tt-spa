import {
  ESecuredIdentityRoleName,
  OrganizationUserResponse,
  OrganizationUserUpdateRequest,
} from 'api/myApi';

export type EditEmployeeProps = {
  isPending: boolean;
  submitHandler: (payload: {
    userId: number;
    form: OrganizationUserUpdateRequest;
  }) => void;
  multipleSelectionCompetences:
    | {
        label: string | null;
        value: string;
      }[]
    | undefined;

  multipleSelectionUserRoles:
    | {
        label: string | null | undefined;
        value: ESecuredIdentityRoleName | undefined;
      }[]
    | undefined;
  employeeData: OrganizationUserResponse | null;
};
