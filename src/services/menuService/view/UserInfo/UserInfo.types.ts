import { OrganizationUserResponse } from 'myApi';

export type UserInfoProps = {
  currentUser: OrganizationUserResponse | null;
  isLoading: boolean;
};
