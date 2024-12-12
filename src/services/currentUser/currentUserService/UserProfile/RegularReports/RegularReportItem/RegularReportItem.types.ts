import {
  GroupReportConfigurationServiceModel,
  HouseManagementResponse,
  OrganizationResponsePagedList,
} from 'api/types';

export type Props = {
  report: GroupReportConfigurationServiceModel;
  isFirst: boolean;
  houseManagements: HouseManagementResponse[] | null;
  organizations: OrganizationResponsePagedList | null;
};
