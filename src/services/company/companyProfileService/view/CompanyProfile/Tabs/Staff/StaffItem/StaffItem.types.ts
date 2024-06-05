import { OrganizationUserListResponse, UserStatusResponse } from 'api/types';

export type StaffItemProps = {
  staff: OrganizationUserListResponse;
  handleOpenStatusChangeModal: () => void;
  handleCatchEmployeeStatusData: (payload: {
    id: number;
    status: UserStatusResponse | null;
  }) => void;
  handleOpenDeleteModal: () => void;
  handleCatchEmployeeId: (payload: number) => void;
  currentUserId: number | null;
};
