import axios from '../../../axios';
import {
  PipeHousingMeteringDeviceResponse,
  UpdatePipeHousingMeteringDeviceRequest,
} from '../../../../myApi';

export async function getOdpu(id: number) {
  try {
    return await axios.get<PipeHousingMeteringDeviceResponse>(
      `HousingMeteringDevices/${id}`
    );
  } catch (error) {
    throw {
      resource: 'device',
      message: 'Произошла ошибка запроса ОДПУ',
    };
  }
}

export async function putOdpu(
  deviceId: number,
  form: UpdatePipeHousingMeteringDeviceRequest
) {
  try {
    const res = await axios.put(`HousingMeteringDevices/${deviceId}`, form);
    alert('ОДПУ успешно изменен!');
    return res;
  } catch (error) {
    const handleError = error.response.data.error;
    const { Data } = handleError;
    const { Id } = Data;
    return { show: true, id: Id };
  }
}
