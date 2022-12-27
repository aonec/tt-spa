import { OrganizationResponse, OrganizationUserListResponse, OrganizationUserListResponsePagedList } from 'myApi';

export type CompanyProfileProps = {
  currentManagingFirm: OrganizationResponse | null;
  staffList: OrganizationUserListResponsePagedList | null
};

export enum CompanyProfileSection {
  CommonInfo = 'commonInfo',
  Staff = 'staff',
  Contractors = 'contractors',
}
