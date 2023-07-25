import { axios } from 'api/axios';

export const fetchDeletePipeDevice = (deviceId: number): Promise<void> =>
  axios.delete(`PipeHousingMeteringDevices/${deviceId}`);
