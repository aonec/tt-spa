import { IndividualDeviceResponse } from 'api/types';

export type ReadingsHistoryModalProps = {
  readonly?: boolean;
  isModalOpen: boolean;
  closeReadingsHistoryModal: () => void;
  individualDevice: IndividualDeviceResponse | null;
  isModal: boolean;
  showDeviceInfo: boolean;
};
