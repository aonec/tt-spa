import { CommunicationPipeResponse } from 'myApi';
import { EResourceType } from 'myApi';

export type HousingMeteringDevicesListProps = {
  communicationPipes: CommunicationPipeResponse[];
  resource: EResourceType;
};
