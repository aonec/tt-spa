import { OrganizationUserListResponsePagedList, UserStatusResponse } from 'myApi';

export type StaffProps = {
  staffList: OrganizationUserListResponsePagedList | null;
  fetchStaffPending: boolean;
  handleOpenStatusChangeModal: () => void;
  handleCatchEmployeeStatusData: (payload: { id: number; status: UserStatusResponse | null }) => void
};
