import { GetIndividualDevicesToClose } from 'api/types';

export type Props = {
  closingDevices: GetIndividualDevicesToClose | null;
  isLoadingClosingDevices: boolean;
};
