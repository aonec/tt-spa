import {
  GetIndividualDevicesToClose,
  HouseManagementWithStreetsResponse,
  OrganizationResponsePagedList,
  PollResponse,
} from 'api/types';
import { CloseDevicesWithoutReadingsQuery } from '../../standartReportService.types';

export type Props = {
  closingDevices: GetIndividualDevicesToClose | null;
  isLoadingClosingDevices: boolean;
  handleStartCloseDevicesByCheckingDatePoll: () => void;
  lastCloseDevicesByCheckingDatePollData: PollResponse | null;
  handleStartCloseDevicesWithoutReadingsPoll: (
    payload: CloseDevicesWithoutReadingsQuery,
  ) => void;
  lastCloseDevicesWithoutReadingsPollData: PollResponse | null;
  handleStartDuplicateReadingsPoll: () => void;
  lastDuplicateReadingsPollData: PollResponse | null;
  handleExport: () => void;
  organizations: OrganizationResponsePagedList | null;
  houseManagements: HouseManagementWithStreetsResponse[] | null;
};

export type ActionsHookProps = Omit<
  Props,
  'handleExport' | 'organizations' | 'houseManagements'
> & { handleStartCloseDevicesWithoutReadingsPoll: () => void };
