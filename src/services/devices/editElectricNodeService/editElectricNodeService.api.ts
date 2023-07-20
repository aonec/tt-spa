import { axios } from 'api/axios';
import { ElectricHousingMeteringDeviceResponse } from 'api/myApi';
import { EditElectricNodePayload } from './editElectricNodeService.types';

export const fetchElectricNode = (
  nodeId: number,
): Promise<ElectricHousingMeteringDeviceResponse> =>
  axios.get(`ElectricHousingMeteringDevices/${nodeId}`);

export const updateElectricHousingMeteringDevice = ({
  device,
  id,
}: EditElectricNodePayload): Promise<void> =>
  axios.put(`ElectricHousingMeteringDevices/${id}`, device);
