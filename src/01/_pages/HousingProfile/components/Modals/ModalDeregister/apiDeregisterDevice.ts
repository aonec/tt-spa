import axios from '../../../../../axios';
import { FormInterface } from './ModalDeregisterForm';

export async function deregisterDevice(form: FormInterface) {
  try {
    alert('Отправляется запрос на снятие прибора с учета !');
    const res = await axios.post('MeteringDevices/close', form);
    alert('Вычислитель успешно снят с учета !');
    return res;
  } catch (error) {
    alert('Что-то пошло не так: попробуйте еще раз');
    throw new Error(error);
  }
}
