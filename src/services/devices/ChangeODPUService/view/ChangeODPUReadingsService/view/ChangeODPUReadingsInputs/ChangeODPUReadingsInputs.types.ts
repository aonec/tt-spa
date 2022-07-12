import {
  EResourceType,
} from 'myApi';
import { PreparedHousingMeteringDeviceReadings } from '../../ChangeODPUReadingsService.types';

export type ChangeODPUReadingsInputsProps = {
  title: string;
  deviceInfo: {
    resource?: EResourceType;
    serialNumber?: string | null;
    model?: string | null;
  };
  oldReadings: PreparedHousingMeteringDeviceReadings[];
  onChange: (payload: OnChangePayload) => void;
};

type OnChangePayload = {
  readings: PreparedHousingMeteringDeviceReadings[];
};
