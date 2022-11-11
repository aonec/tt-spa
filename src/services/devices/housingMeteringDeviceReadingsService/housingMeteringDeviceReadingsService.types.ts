import { EResourceType } from 'myApi';

export type HousingMeteringDeviceReadingsContainerProps = {
  nodeId: number;
  resource: EResourceType;
};

export type PreparedMeteringDeviceReading = {
  year: string;
  readings: {
    month: string;
    readings: SortedMeteringDeviceReading[];
  }[];
};

export type SortedMeteringDeviceReading = {
  value: number;
  deviceId: number;
};
