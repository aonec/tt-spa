import { OrganizationUserListResponsePagedList } from 'myApi';

export type StaffProps = {
  staffList: OrganizationUserListResponsePagedList | null;
  fetchStaffPending: boolean;
  handleOpenStatusChangeModal: () => void;
};
