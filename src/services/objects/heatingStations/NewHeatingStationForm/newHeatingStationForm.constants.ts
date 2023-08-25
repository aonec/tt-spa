import { HeatingStationType } from './NewHeatingStationForm.types';

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
