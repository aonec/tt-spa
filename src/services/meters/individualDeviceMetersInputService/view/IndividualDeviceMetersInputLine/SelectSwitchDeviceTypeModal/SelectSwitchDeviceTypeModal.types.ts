export type SelectSwitchDeviceTypeModalProps = {
  show: boolean;
  deviceId: number;
  close: () => void;
  apartmentId: number;
};

export type SelectSwitchDeviceType = 'switch' | 'check';
