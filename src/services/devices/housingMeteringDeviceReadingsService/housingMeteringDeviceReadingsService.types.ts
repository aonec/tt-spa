import { EMagistralType, EResourceType } from 'myApi';

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
  value: number | null;
  deviceId: number;
  previousReadingsId: string | null;
  magistralType: EMagistralType;
  id: string | null;
};

export type MeteringDeviceReadingWithEmpties = SortedMeteringDeviceReading & {
  year: string | number;
};
