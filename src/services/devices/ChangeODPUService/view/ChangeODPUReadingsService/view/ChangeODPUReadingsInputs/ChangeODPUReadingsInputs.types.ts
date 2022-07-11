import {
  EResourceType,
  HousingMeteringDeviceReadingsIncludingPlacementResponse,
} from 'myApi';

export type ChangeODPUReadingsInputsProps = {
  title: string;
  deviceInfo: {
    resource?: EResourceType;
    serialNumber?: string | null;
    model?: string | null;
  };
  slider: {
    sliderIndex: number;
    up: () => void;
    down: () => void;
    canUp: boolean;
    canDown: boolean;
  };
  oldReadings: {
    [key: number]: HousingMeteringDeviceReadingsIncludingPlacementResponse;
  };
};