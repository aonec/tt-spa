import { CreatePipeHousingMeteringDeviceRequest } from 'api/types';

export type CreatePipeHousingMeteringDevicePayload =
  CreatePipeHousingMeteringDeviceRequest & { pipeId: number };
