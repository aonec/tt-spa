export type ReadingsHistoryModalProps = {
  deviceId?: number;
  isModal?: boolean;
  readonly?: boolean;
  isOpen: boolean;
  closeReadingsHistoryModal: () => void;
};
