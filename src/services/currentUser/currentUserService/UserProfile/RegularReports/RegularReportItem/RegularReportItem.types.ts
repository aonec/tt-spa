import {
  ContractorListResponse,
  GroupReportConfigurationServiceModel,
  HouseManagementResponse,
  OrganizationResponsePagedList,
  OrganizationUserListResponsePagedList,
} from 'api/types';

export type Props = {
  report: GroupReportConfigurationServiceModel;
  isFirst: boolean;
  houseManagements: HouseManagementResponse[] | null;
  organizations: OrganizationResponsePagedList | null;
  handleDeleteReport: (payload: number) => void;
  handleChangeActivity: (payload: GroupReportConfigurationServiceModel) => void;
  isReportUpdating: boolean;
  staffList: OrganizationUserListResponsePagedList | null;
  contractors: ContractorListResponse[] | null;
};
