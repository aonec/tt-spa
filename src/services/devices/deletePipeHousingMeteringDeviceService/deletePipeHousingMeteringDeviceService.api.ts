import { axios } from '01/axios';

export const fetchDeletePipeDevice = (deviceId: number): Promise<void> =>
  axios.delete(`PipeHousingMeteringDevices/${deviceId}`);
