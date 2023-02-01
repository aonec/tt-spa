import { EResourceType } from 'myApi';
import { CreatePipeHousingMeteringDeviceInNodeRequest } from 'myApi';

export type MeteringDeviceListItemProps = {
  device: CreatePipeHousingMeteringDeviceInNodeRequest & { id?: number };
  resource: EResourceType;
  handleDeleteDevice?: () => void;
};
