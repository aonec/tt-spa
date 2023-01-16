import {
  ContractorListResponsePagedList,
  OrganizationResponse,
  OrganizationUserListResponsePagedList,
  UserStatusResponse,
} from 'myApi';
import { ContractorDataType } from 'services/contractors/editContractorService/editContractorService.types';

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
  conractorsList: ContractorListResponsePagedList | null;
  fetchContractorsPending: boolean;
  handleOpenAddContractorModal: () => void;
  handleOpenDeleteContractorModal: () => void;
  catchContractorId: (payload: { id: number; name: string | null }) => void;
  handleOpenEditContractorModal: () => void;
  catchContractorData: (payload: ContractorDataType) => void;
};

export enum CompanyProfileSection {
  CommonInfo = 'commonInfo',
  Staff = 'staff',
  Contractors = 'contractors',
}
