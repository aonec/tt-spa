import { EResourceDisconnectingType } from 'myApi';
import { getFilledArray } from 'utils/getFilledArray';
import * as yup from 'yup';

export const formInitialValues = {
  resource: null,
  disconnectingType: null,
  housingStockIds: [],
  sender: '',
  startDate: '',
  startHour: '0:00',
  endDate: '',
  endHour: '0:00',
  heatingStationId: '',
};

export const createResourceDisconnectionValidationSchema = yup.object().shape({
  resource: yup.string().required('Это поле обязательно').nullable(),
  disconnectingType: yup.string().required('Это поле обязательно').nullable(),
  sender: yup.string().required('Это поле обязательно'),
  housingStockIds: yup.array().required('Это поле обязательно'),
  startDate: yup.string().required('Это поле обязательно'),
  endDate: yup.string().required('Это поле обязательно'),
});

export const hours = getFilledArray(24, (index) => `${index}:00`);
