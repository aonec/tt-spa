import { axios } from '01/axios';
import { PipeNodeMeteringDeviceResponse } from 'myApi';

export const getMeteringDevices = (
  pipeNodeId: number,
): Promise<PipeNodeMeteringDeviceResponse[]> =>
  axios.get(`PipeNodes/${pipeNodeId}/MeteringDevices`);
