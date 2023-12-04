import {
  ContractorListResponsePagedList,
  OrganizationResponse,
  OrganizationUserListResponsePagedList,
  UserStatusResponse,
} from 'api/types';
import { ContractorDataType } from 'services/contractors/editContractorService/editContractorService.types';

export type CompanyProfileProps = {
  staffList: OrganizationUserListResponsePagedList | null;
  isLoadingStaff: boolean;
  handleOpenStatusChangeModal: () => void;
  handleCatchEmployeeStatusData: (payload: {
    id: number;
    status: UserStatusResponse | null;
  }) => void;
  handleOpenDeleteModal: () => void;
  handleCatchEmployeeId: (payload: number) => void;
  handleOpenCreateEmployeeModal: () => void;
  conractorsList: ContractorListResponsePagedList | null;
  isLoadingContractors: boolean;
  handleOpenAddContractorModal: () => void;
  catchContractorId: (payload: { id: number; name: string | null }) => void;
  handleOpenEditContractorModal: () => void;
  catchContractorData: (payload: ContractorDataType) => void;
  currentManagingFirm: OrganizationResponse | null;
};

export enum CompanyProfileSection {
  CommonInfo = 'commonInfo',
  Staff = 'staff',
  Contractors = 'contractors',
}
