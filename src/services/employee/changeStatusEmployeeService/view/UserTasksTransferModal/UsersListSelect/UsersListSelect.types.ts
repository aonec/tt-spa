import { OrganizationUserListResponse } from 'api/myApi';

export type UsersListSelectProps = {
  organizationUsersList: OrganizationUserListResponse[] | null;
  selectedUser: number | null;
  handleSelectUser: (userId: number) => void;
  isRoleSelected: boolean;
};
