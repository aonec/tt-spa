import { getFilledArray } from 'utils/getFilledArray';
import * as yup from 'yup';

export const createResourceDisconnectionValidationSchema = yup.object().shape({
  resource: yup.string().required('Это поле обязательно'),
  disconnectingType: yup.string().required('Это поле обязательно'),
  sender: yup.string().required('Это поле обязательно'),
  housingStockIds: yup.array().required('Это поле обязательно'),
  startDate: yup.string().required('Это поле обязательно'),
  endDate: yup.string().required('Это поле обязательно'),
});

export const hours = getFilledArray(24, (index)=> `${index}:00`);