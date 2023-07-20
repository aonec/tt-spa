import {
  OrganizationUserListResponsePagedList,
  UserStatusResponse,
} from 'api/myApi';

export type StaffProps = {
  staffList: OrganizationUserListResponsePagedList | null;
  isLoadingStaff: boolean;
  handleOpenStatusChangeModal: () => void;
  handleCatchEmployeeStatusData: (payload: {
    id: number;
    status: UserStatusResponse | null;
  }) => void;
  handleOpenDeleteModal: () => void;
  handleCatchEmployeeId: (payload: number) => void;
};
