import { axios } from '01/axios';
import { HousingByFilterResponse } from 'myApi';
import { GetHousingByFilterRequestPayload } from './individualDevicesViewByAddressService.types';

export const getHousingsByFilter = (
  params: GetHousingByFilterRequestPayload
): Promise<HousingByFilterResponse | null> =>
  axios.get('Devices/Individual/House', { params });
