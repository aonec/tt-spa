import {
  GroupReportFormResponse,
  HouseManagementResponse,
  HouseManagementWithStreetsResponse,
  OrganizationResponsePagedList,
  OrganizationUserListResponsePagedList,
} from 'api/types';
import { GroupReportRequestPayload } from '../../groupReportService.types';

export type GroupReportFormProps = {
  formId: string;
  handleDownload: (payload: Partial<GroupReportRequestPayload>) => void;
  reportFilters: GroupReportFormResponse;
  organizations: OrganizationResponsePagedList | null;
  houseManagements: HouseManagementResponse[] | null;
  addressesWithHouseManagements: HouseManagementWithStreetsResponse[];
  setRegularUpload: (payload: boolean) => void;
  staffList: OrganizationUserListResponsePagedList | null;
};

export enum ExportReportType {
  ManagementFirm = 'ManagementFirm',
  HouseManagement = 'HouseManagement',
  Address = 'Address',
}
