import { OrganizationUserListResponse } from 'myApi';

export type UsersListSelectProps = {
  organizationUsersList: OrganizationUserListResponse[] | null;
  selectedUser: number | null;
  handleSelectUser: (userId: number) => void;
};
