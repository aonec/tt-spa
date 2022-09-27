import axios from '../../../../../axios';
import { CreatePipeHousingMeteringDeviceRequest } from '../../../../../../myApi';
import { message } from 'antd';

export async function addHousingMeteringDevice(
  form: CreatePipeHousingMeteringDeviceRequest
) {
  try {
    const res = await axios.post('PipeHousingMeteringDevices', form);
    alert('ОДПУ успешно создан !');
    return res;
  } catch (error) {
    message.error((error as any)?.response?.data?.error?.Text);
    console.log({ ...(error as object) });
    throw {
      resource: 'device',
      message: 'Произошла ошибка добавления ОДПУ',
    };
  }
}
