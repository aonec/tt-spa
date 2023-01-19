import { axios } from '01/axios';
import { MeteringDeviceResponse, UpdateCalculatorRequest } from 'myApi';

export function putCalculator(params: {
  deviceId: number;
  form: UpdateCalculatorRequest;
}): Promise<MeteringDeviceResponse | null> {
  return axios.put(`Calculators/${params.deviceId}`, params.form);
}
