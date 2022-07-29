import { axios } from "../../../api/axios";
import { ElectricHousingMeteringDeviceResponse, SwitchElectricHousingDeviceRequest } from "../../../api/types";


export const fetchHousingMeteringDevice = (
  deviceId: number
): Promise<ElectricHousingMeteringDeviceResponse> =>
  axios.get(`ElectricHousingMeteringDevices/${deviceId}`);

export const postSwitchHousingMeteringDevice = (
  payload: SwitchElectricHousingDeviceRequest
): Promise<void> =>
  axios.post('ElectricHousingMeteringDevices/switch', payload);
