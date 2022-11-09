import { EResourceType } from 'myApi';

export type HousingMeteringDeviceReadingsContainerProps = {
  nodeId: number;
  resource: EResourceType;
};

export type PreparedMeteringDeviceReadings = {
  year: string;
  readings: {
    month: string;
    readings: (SortedMeteringDeviceReading | null)[];
  }[];
}[];

export type SortedMeteringDeviceReading = {
  value: number;
  deviceId: number;
};
