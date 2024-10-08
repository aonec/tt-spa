import { axios } from 'api/axios';
import {
  CalculatorResponse,
  MeteringDeviceResponse,
  UpdateCalculatorRequest,
} from 'api/types';

export async function putCalculator(params: {
  deviceId: number;
  form: UpdateCalculatorRequest;
}): Promise<MeteringDeviceResponse | null> {
  const res: MeteringDeviceResponse = await axios.put(
    `Calculators/${params.deviceId}`,
    params.form,
  );
  return res;
}

export const getAlreadyExistingConnectionCalculator = (
  deviceId: number,
): Promise<CalculatorResponse | null> => {
  return axios.get(`/Calculators/${deviceId}`);
};
