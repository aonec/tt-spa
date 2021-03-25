import axios from '../../../../../axios';

export async function putCalculator(deviceId = '', form = {}) {
  alert('Cейчас будем отправлять данные!');
  try {
    const res = await axios.put(`Calculators/${deviceId}`, form);
    // console.log("putCalculator", form)
    alert('Вычислитель успешно изменен!');
    return res;
  } catch (error) {
    const handleError = error.response.data.error;
    console.log(handleError);
    if (handleError.Code === 'entityAlreadyExists') {
      const { Message } = handleError;
      if (Message === null) {
        const id = null;
        console.log(handleError.Message);
        return { show: true, id: id };
      }
      const id = parseInt(Message.replace(/[^\d]/g, ''));
      console.log(handleError.Message);
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
    console.log(handleError);
    if (handleError.Code === 'entityAlreadyExists') {
      const { Message } = handleError;
      if (Message === null) {
        const id = null;
        console.log(handleError.Message);
        return { show: true, id: id };
      }
      const id = parseInt(Message.replace(/[^\d]/g, ''));
      console.log(handleError.Message);
      return { show: true, id: id };
    }
  }
}
