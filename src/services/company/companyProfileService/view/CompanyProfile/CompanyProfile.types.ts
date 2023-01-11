import {
  OrganizationResponse,
  OrganizationUserListResponsePagedList,
} from 'myApi';

export type CompanyProfileProps = {
  currentManagingFirm: OrganizationResponse | null;
  staffList: OrganizationUserListResponsePagedList | null;
  fetchStaffPending: boolean;
  handleOpenStatusChangeModal: () => void;
};

export enum CompanyProfileSection {
  CommonInfo = 'commonInfo',
  Staff = 'staff',
  Contractors = 'contractors',
}
