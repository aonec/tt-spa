import axios from '../../../axios';
import {
  HousingMeteringDeviceResponse,
  MeteringDeviceResponseSuccessApiResponse,
  UpdateHousingMeteringDeviceRequest,
} from '../../../../myApi';

export async function getOdpu(id: number) {
  try {
    return await axios.get<HousingMeteringDeviceResponse>(
      `HousingMeteringDevices/${id}`
    );
  } catch (error) {
    console.log(error);
    throw {
      resource: 'device',
      message: 'Произошла ошибка запроса ОДПУ',
    };
  }
}

export async function putOdpu(
  deviceId: number,
  form: UpdateHousingMeteringDeviceRequest
) {
  try {
    const res: MeteringDeviceResponseSuccessApiResponse = await axios.put(
      `HousingMeteringDevices/${deviceId}`,
      form
    );
    alert('ОДПУ успешно изменен!');
    return res;
  } catch (error) {
    console.log(error);
    alert('Что-то пошло не так: попробуйте проверить все данные');
    throw new Error(error);
  }
}
