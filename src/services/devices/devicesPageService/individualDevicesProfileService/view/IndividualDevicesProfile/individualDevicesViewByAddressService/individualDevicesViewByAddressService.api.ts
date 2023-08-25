import { axios } from 'api/axios';
import {
  ApartmentByAddressFilterResponsePagedList,
  BuildingByFilterResponse,
} from 'api/types';
import {
  GetHousingByFilterRequestPayload,
  GetIndividualDevicesApartments,
} from './individualDevicesViewByAddressService.types';

export const getHousingsByFilter = (
  params: GetHousingByFilterRequestPayload,
): Promise<BuildingByFilterResponse | null> =>
  axios.get('Devices/Individual/House', { params });

export const getIndividualDevicesApartments = (
  params: GetIndividualDevicesApartments,
): Promise<ApartmentByAddressFilterResponsePagedList | null> =>
  axios.get('Devices/Individual/Apartments', { params });
