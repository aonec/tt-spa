import { axios } from 'api/axios';
import { IndividualDeviceListResponseFromDevicePagePagedList } from 'api/types';
import { IndividualDeviceSearchbySerialNumberPayload } from './individualDevicesViesBySerialNumberService.types';

export const fetchIndividualDevices = (
  params: IndividualDeviceSearchbySerialNumberPayload,
): Promise<IndividualDeviceListResponseFromDevicePagePagedList> =>
  axios.get('devices/individual', { params });
