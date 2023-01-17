import {
  OrganizationResponse,
  OrganizationUserListResponsePagedList,
  UserStatusResponse,
} from 'myApi';

export type CompanyProfileProps = {
  currentManagingFirm: OrganizationResponse | null;
  staffList: OrganizationUserListResponsePagedList | null;
  fetchStaffPending: boolean;
  handleOpenStatusChangeModal: () => void;
  handleCatchEmployeeStatusData: (payload: {
    id: number;
    status: UserStatusResponse | null;
  }) => void;
  handleOpenDeleteModal: () => void;
  handleCatchEmployeeId: (payload: number) => void;
  handleOpenCreateEmployeeModal: () => void;
};

export enum CompanyProfileSection {
  CommonInfo = 'commonInfo',
  Staff = 'staff',
  Contractors = 'contractors',
}
