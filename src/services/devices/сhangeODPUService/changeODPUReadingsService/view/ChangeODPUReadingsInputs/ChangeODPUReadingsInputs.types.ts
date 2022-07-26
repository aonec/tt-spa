import {
  EResourceType,
} from '../../api/types';
import { PreparedHousingMeteringDeviceReadings } from '../../changeODPUReadingsService.types';

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
