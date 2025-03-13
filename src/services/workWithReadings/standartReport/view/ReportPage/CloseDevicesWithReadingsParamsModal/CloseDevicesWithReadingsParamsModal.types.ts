import {
  HouseManagementWithStreetsResponse,
  OrganizationResponsePagedList,
} from 'api/types';
import { CloseDevicesWithoutReadingsQuery } from 'services/workWithReadings/standartReport/standartReportService.types';

export type Props = {
  isOpen: boolean;
  handleClose: () => void;
  onSubmit: (payload: CloseDevicesWithoutReadingsQuery) => void;
  organizations: OrganizationResponsePagedList | null;
  houseManagements: HouseManagementWithStreetsResponse[] | null;
};
