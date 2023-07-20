import { axios } from 'api/axios';
import { IndividualDeviceListItemResponsePagedList } from 'myApi';
import { GetIndividualDevicesParams } from './apartmentIndividualDevicesMetersService.types';

export const getIndividualDevices = (
  params: GetIndividualDevicesParams,
): Promise<IndividualDeviceListItemResponsePagedList> =>
  axios.get('IndividualDevices', { params });
