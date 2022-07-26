import { ManagingFirmUserResponse } from '../../api/types';

export type UserInfoProps = {
  currentUser: ManagingFirmUserResponse | null;
  isLoading: boolean;
};
