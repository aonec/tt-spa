import axios from '../../../../../axios';
import { CreateHousingMeteringDeviceRequest } from '../../../../../../myApi';

export async function addHousingMeteringDevice(
  form: CreateHousingMeteringDeviceRequest,
) {
  try {
    const res = await axios.post('HousingMeteringDevices', form);
    alert('ОДПУ успешно создан !');
    return res;
  } catch (error) {
    console.log(error);
    throw {
      resource: 'device',
      message: 'Произошла ошибка добавления ОДПУ',
    };
  }
}
