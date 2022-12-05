import {
  CreatePipeHousingMeteringDeviceInNodeRequest,
  EResourceType,
} from 'myApi';

export type Props = {
  resource: EResourceType;
};

export type CreateCommonDevicePartitial = Partial<CreatePipeHousingMeteringDeviceInNodeRequest>;
