import { axios } from '01/axios';
import { IndividualDeviceListResponseFromDevicePagePagedList } from 'myApi';
import { IndividualDeviceSearchbySerialNumberPayload } from './individualDevicesViesBySerialNumberService.types';

export const fetchIndividualDevices = (
  params: IndividualDeviceSearchbySerialNumberPayload,
): Promise<IndividualDeviceListResponseFromDevicePagePagedList> =>
  axios.get('devices/individual', { params });
