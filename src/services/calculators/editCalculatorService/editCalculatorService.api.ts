import { axios } from '01/axios';
import { UpdateCalculatorRequest } from 'myApi';

export function putCalculator(deviceId: number, form: UpdateCalculatorRequest) {
  return axios.put(`Calculators/${deviceId}`, form);
}
