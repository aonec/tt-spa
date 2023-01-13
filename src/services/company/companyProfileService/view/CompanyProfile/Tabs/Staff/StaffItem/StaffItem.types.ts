import { OrganizationUserListResponse, UserStatusResponse } from 'myApi';

export type StaffItemProps = {
  staff: OrganizationUserListResponse;
  handleOpenStatusChangeModal: () => void;
  handleCatchEmployeeStatusData: (payload: {
    id: number;
    status: UserStatusResponse | null;
  }) => void;
  handleOpenDeleteModal: () => void;
  handleCatchEmployeeId: (payload: number) => void;
};
