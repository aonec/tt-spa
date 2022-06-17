import { ManagementFirmResponse } from 'myApi';

export type UserInfoProps = {
  currentUser: ManagementFirmResponse | null;
  isLoading: boolean;
};
