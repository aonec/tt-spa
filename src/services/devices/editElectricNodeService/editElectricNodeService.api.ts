import { axios } from '01/axios';
import { ElectricHousingMeteringDeviceResponse } from 'myApi';
import { EditElectricNodePayload } from './editElectricNodeService.types';
import { UpdateElectricHousingMeteringDevice } from './view/EditElectricNodePage/EditElectricNodePage.types';

export const fetchElectricNode = (
  nodeId: number
): Promise<ElectricHousingMeteringDeviceResponse> =>
  axios.get(`ElectricHousingMeteringDevices/${nodeId}`);

export const updateElectricHousingMeteringDevice = ({
  device,
  id,
}: EditElectricNodePayload): Promise<void> =>
  axios.put(`ElectricHousingMeteringDevices/${id}`, device);
