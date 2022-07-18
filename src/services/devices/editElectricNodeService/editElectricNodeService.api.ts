import { axios } from '01/axios';
import { ElectricHousingMeteringDeviceResponse } from 'myApi';

export const fetchElectricNode = (
  nodeId: number
): Promise<ElectricHousingMeteringDeviceResponse> => axios.get(`ElectricHousingMeteringDevices/${nodeId}`);
