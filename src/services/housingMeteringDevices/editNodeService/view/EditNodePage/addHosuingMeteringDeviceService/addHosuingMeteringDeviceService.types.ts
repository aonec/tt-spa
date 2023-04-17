import { CreatePipeHousingMeteringDeviceRequest } from 'myApi';

export type CreatePipeHousingMeteringDevicePayload =
  CreatePipeHousingMeteringDeviceRequest & { pipeId: number };
