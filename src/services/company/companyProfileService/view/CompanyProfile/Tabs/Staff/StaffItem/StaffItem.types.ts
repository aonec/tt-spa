import { OrganizationUserListResponse } from 'myApi';

export type StaffItemProps = {
  staff: OrganizationUserListResponse;
  handleOpenStatusChangeModal: () => void;
};
