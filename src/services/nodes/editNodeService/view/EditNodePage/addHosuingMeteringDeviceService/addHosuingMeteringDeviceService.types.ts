import { CreatePipeHousingMeteringDeviceRequest } from 'api/myApi';

export type CreatePipeHousingMeteringDevicePayload =
  CreatePipeHousingMeteringDeviceRequest & { pipeId: number };
