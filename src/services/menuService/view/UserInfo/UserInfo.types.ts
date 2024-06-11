import { OrganizationResponse, OrganizationUserResponse } from 'api/types';

export type UserInfoProps = {
  isOpen: boolean;
  currentUser: OrganizationUserResponse | null;
  isLoading: boolean;
  currentManagingFirm: OrganizationResponse | null;
};
