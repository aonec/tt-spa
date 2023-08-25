import {
  CommunicationPipeResponse,
  EPipeNodeConfig,
  PipeHousingMeteringDeviceListResponse,
} from 'api/types';

export type HousingMeteringDevicesListProps = {
  communicationPipes: CommunicationPipeResponse[];
  configuration: EPipeNodeConfig;
  handleEditDevice?: (deviceId: number) => void;
  handleDeleteDevice?: (device: PipeHousingMeteringDeviceListResponse) => void;
};
