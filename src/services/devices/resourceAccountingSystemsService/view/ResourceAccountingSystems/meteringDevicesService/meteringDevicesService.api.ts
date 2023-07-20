import { axios } from 'api/axios';
import { PipeNodeMeteringDeviceResponse } from 'api/myApi';

export const getMeteringDevices = (
  pipeNodeId: number,
): Promise<PipeNodeMeteringDeviceResponse[]> =>
  axios.get(`PipeNodes/${pipeNodeId}/MeteringDevices`);
