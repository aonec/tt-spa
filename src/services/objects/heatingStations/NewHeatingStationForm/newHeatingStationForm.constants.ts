import * as yup from 'yup';
import { HeatingStationType } from './NewHeatingStationForm.types';

export const validationSchema = yup.object().shape({
  name: yup.string().nullable().required('Обязательное поле'),
  address: yup.object().shape({
    city: yup.string().nullable().required('Обязательное поле'),
    street: yup.string().required('Обязательное поле'),
    number: yup.string().nullable().required('Обязательное поле'),
  }),
});

export const HeatingStationTypeRequestDictionary: {
  [key in HeatingStationType]: boolean;
} = {
  [HeatingStationType.ThermalChamber]: true,
  [HeatingStationType.CentralHeatingStation]: false,
};

export const HeatingStationTypeDictionary: {
  [key in HeatingStationType]: string;
} = {
  [HeatingStationType.ThermalChamber]: 'ТК',
  [HeatingStationType.CentralHeatingStation]: 'ЦТП',
};
