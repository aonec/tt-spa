/* eslint-disable */

import axios from '../../../../../../api/axios';

export async function putCalculator(deviceId = '', form = {}) {
  alert('Cейчас будем отправлять данные!');
  try {
    const res = await axios.put(`Calculators/${deviceId}`, form);
    alert('Вычислитель успешно изменен!');
    return res;
  } catch (error) {
    const handleError = error.response.data.error;
    if (handleError.Code === 'entityAlreadyExists') {
      const { Message } = handleError;
      if (Message === null) {
        const id = null;
        return { show: true, id: id };
      }
      const id = parseInt(Message.replace(/[^\d]/g, ''));
      return { show: true, id: id };
    }
  }
}

export async function addCalculator(form) {
  try {
    const res = await axios.post('Calculators', form);
    alert('Вычислитель успешно создан !');
    return res;
  } catch (error) {
    const handleError = error.response.data.error;
    if (handleError.Code === 'entityAlreadyExists') {
      const { Message } = handleError;
      if (Message === null) {
        const id = null;
        return { show: true, id: id };
      }
      const id = parseInt(Message.replace(/[^\d]/g, ''));
      return { show: true, id: id };
    }
  }
}
