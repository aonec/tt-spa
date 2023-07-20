import { EResourceDisconnectingType } from 'api/types';
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
  documentId: null,
};

export const createResourceDisconnectionValidationSchema = yup.object().shape({
  resource: yup.string().required('Это поле обязательно').nullable(),
  disconnectingType: yup.string().required('Это поле обязательно').nullable(),
  sender: yup.string().required('Это поле обязательно'),
  housingStockIds: yup.array().required('Это поле обязательно'),
  startDate: yup.string().required('Это поле обязательно'),
  endDate: yup.string().when('disconnectingType', {
    is: EResourceDisconnectingType.InterHeatingSeason,
    otherwise: (date: yup.StringSchema) =>
      date.required('Это поле обязательно'),
  }),
  documentId: yup
    .number()
    .nullable()
    .when('disconnectingType', {
      is: EResourceDisconnectingType.InterHeatingSeason,
      then: (id: yup.NumberSchema) =>
        id.required('Прикрепите документ или акт'),
    }),
});

export const hours = getFilledArray(24, (index) => `${index}:00`);
