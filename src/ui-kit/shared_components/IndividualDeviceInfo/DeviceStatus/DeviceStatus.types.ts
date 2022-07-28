import { EClosingReason } from '../../../../api/types';

export type DeviceStatusProps = {
  isActive: boolean;
  closingReason: EClosingReason;
};
