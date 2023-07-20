import { EResourceType } from 'api/types';
import { CreatePipeHousingMeteringDeviceInNodeRequest } from 'api/types';

export type MeteringDeviceListItemProps = {
  device: CreatePipeHousingMeteringDeviceInNodeRequest & { id?: number };
  resource: EResourceType;
  handleDeleteDevice?: () => void;
  handleEditDevice?: (deviceId: number) => void;
};
