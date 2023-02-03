import { PipeHousingMeteringDeviceListResponse } from 'myApi';

export type RelatedDevicesListProps = {
  pipeDevices: {
    devices: PipeHousingMeteringDeviceListResponse[];
    nodeNumber: number;
  }[];
};
