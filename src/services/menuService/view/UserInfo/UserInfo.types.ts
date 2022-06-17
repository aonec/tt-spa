import { ManagingFirmUserResponse } from 'myApi';

export type UserInfoProps = {
  currentUser: ManagingFirmUserResponse | null;
  isLoading: boolean;
};
