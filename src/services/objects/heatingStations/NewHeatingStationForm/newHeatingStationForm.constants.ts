import * as yup from 'yup';
import { HeatingStationType } from './NewHeatingStationForm.types';

export const validationSchema = yup.object().shape({
  heatingStationType: yup.string().required('Обязательное поле'),
  heatingStationNumber: yup.string().required('Обязательное поле'),
});

export const HeatingStationTypeDictionary: {
  [key in HeatingStationType]: boolean;
} = {
  [HeatingStationType.ThermalChamber]: true,
  [HeatingStationType.CentralHeatingStation]: false,
};
