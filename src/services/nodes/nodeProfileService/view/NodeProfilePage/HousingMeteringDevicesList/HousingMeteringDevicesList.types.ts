import {
  CommunicationPipeResponse,
  EPipeNodeConfig,
  PipeHousingMeteringDeviceListResponse,
} from 'myApi';

export type HousingMeteringDevicesListProps = {
  communicationPipes: CommunicationPipeResponse[];
  configuration: EPipeNodeConfig;
  handleEditDevice?: (deviceId: number) => void;
  handleDeleteDevice?: (device: PipeHousingMeteringDeviceListResponse) => void;
};
