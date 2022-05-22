import axios from '../../../../../axios';
import { CreatePipeHousingMeteringDeviceRequest } from '../../../../../../myApi';

export async function addHousingMeteringDevice(
  form: CreatePipeHousingMeteringDeviceRequest
) {
  try {
    const res = await axios.post('PipeHousingMeteringDevices', form);
    alert('ОДПУ успешно создан !');
    return res;
  } catch (error) {
    throw {
      resource: 'device',
      message: 'Произошла ошибка добавления ОДПУ',
    };
  }
}
