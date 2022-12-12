import { EResourceType } from 'myApi';
import { CreatePipeHousingMeteringDeviceInNodeRequest } from 'myApi';

export type MeteringDeviceListItemProps = {
  device: CreatePipeHousingMeteringDeviceInNodeRequest;
  resource: EResourceType;
  handleDeleteDevice?: () => void;
};
