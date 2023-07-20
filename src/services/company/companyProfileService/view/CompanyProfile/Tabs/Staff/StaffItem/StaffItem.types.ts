import { OrganizationUserListResponse, UserStatusResponse } from 'api/myApi';

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
