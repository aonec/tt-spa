import { axios } from '01/axios';
import {
  MeteringDeviceResponse,
  PipeHousingMeteringDeviceResponse,
  PipeNodeResponse,
  UpdatePipeHousingMeteringDeviceRequest,
} from 'myApi';

export const putHousingMeteringDevice = ({
  deviceId,
  ...payload
}: {
  deviceId: number;
} & UpdatePipeHousingMeteringDeviceRequest): Promise<MeteringDeviceResponse> =>
  axios.put(`PipeHousingMeteringDevices/${deviceId}`, payload);

export const fetchHousingMeteringDevice = (
  id: number,
): Promise<PipeHousingMeteringDeviceResponse> =>
  axios.get(`PipeHousingMeteringDevices/${id}`);

export const fetchPipeNode = (id: number): Promise<PipeNodeResponse> =>
  axios.get(`PipeNodes/${id}`);
