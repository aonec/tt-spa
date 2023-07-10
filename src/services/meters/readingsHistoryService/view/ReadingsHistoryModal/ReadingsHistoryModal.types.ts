import { IndividualDeviceResponse } from 'myApi';

export type ReadingsHistoryModalProps = {
  readonly?: boolean;
  isModalOpen: boolean;
  closeReadingsHistoryModal: () => void;
  individualDevice: IndividualDeviceResponse | null;
};
