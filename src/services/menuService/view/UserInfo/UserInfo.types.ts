import { OrganizationUserResponse } from 'api/types';

export type UserInfoProps = {
  currentUser: OrganizationUserResponse | null;
  isLoading: boolean;
};
