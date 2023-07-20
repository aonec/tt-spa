import { EResourceType } from 'api/myApi';
import { CreatePipeHousingMeteringDeviceInNodeRequest } from 'api/myApi';

export type MeteringDeviceListItemProps = {
  device: CreatePipeHousingMeteringDeviceInNodeRequest & { id?: number };
  resource: EResourceType;
  handleDeleteDevice?: () => void;
  handleEditDevice?: (deviceId: number) => void;
};
