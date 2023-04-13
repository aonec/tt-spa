import {
  IndividualDeviceResponse,
  UpdateIndividualDeviceRequest,
} from '../../myApi';
import axios from '../axios';

export async function getIndividualDevice(id: number) {
  const res = await axios.get<any, IndividualDeviceResponse>(
    `IndividualDevices/${id}`,
  );
  return res;
}


export async function putIndividualDevice(
  deviceId: number,
  form: UpdateIndividualDeviceRequest,
) {
  try {
    const res = await axios.put(`IndividualDevices/${deviceId}`, form);
    return res;
  } catch (error) {
    throw error;
  }
}
