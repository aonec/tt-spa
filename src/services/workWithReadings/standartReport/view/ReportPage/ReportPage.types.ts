import { GetIndividualDevicesToClose, PollResponse } from 'api/types';

export type Props = {
  closingDevices: GetIndividualDevicesToClose | null;
  isLoadingClosingDevices: boolean;
  handleStartCloseDevicesByCheckingDatePoll: () => void;
  lastCloseDevicesByCheckingDatePollData: PollResponse | null;
  handleStartCloseDevicesWithoutReadingsPoll: () => void;
  lastCloseDevicesWithoutReadingsPollData: PollResponse | null;
  handleStartDuplicateReadingsPoll: () => void;
  lastDuplicateReadingsPollData: PollResponse | null;
};
