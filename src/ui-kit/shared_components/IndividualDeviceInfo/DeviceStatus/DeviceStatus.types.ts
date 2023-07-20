import { EClosingReason } from '../../../../api/myApi';

export type DeviceStatusProps = {
  isActive: boolean;
  closingReason?: EClosingReason;
};
