import { EMagistralType, EResourceType } from 'myApi';

export type HousingMeteringDeviceReadingsContainerProps = {
  nodeId: number;
  resource: EResourceType;
  deviceIds: { [key in EMagistralType]: number | null };
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
