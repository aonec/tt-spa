import { OrganizationUserResponse } from 'api/myApi';

export type UserInfoProps = {
  currentUser: OrganizationUserResponse | null;
  isLoading: boolean;
};
