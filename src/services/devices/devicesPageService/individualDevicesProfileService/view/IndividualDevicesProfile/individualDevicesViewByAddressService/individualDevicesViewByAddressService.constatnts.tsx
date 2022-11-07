import { SearchIndividualDevicesRequestPayload } from './individualDevicesViewByAddressService.types';

export const APARTMENTS_LIST_PAGE_SIZE = 20;

export const searchInitialValues: SearchIndividualDevicesRequestPayload = {
  City: '',
  Street: '',
  HouseNumber: '',
  Apartment: '',
  HouseCorpus: '',
  Model: '',
  SerialNumber: '',
  MountPlace: '',
  Resource: null,
  ApartmentStatus: null,
  ClosingReason: null,
  ExpiresCheckingDateAt: null,
  IsAlsoClosing: false,
};
