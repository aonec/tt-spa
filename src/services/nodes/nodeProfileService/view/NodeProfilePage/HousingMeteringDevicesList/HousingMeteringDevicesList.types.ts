import { CommunicationPipeResponse, EPipeNodeConfig } from 'myApi';

export type HousingMeteringDevicesListProps = {
  communicationPipes: CommunicationPipeResponse[];
  configuration: EPipeNodeConfig;
};
