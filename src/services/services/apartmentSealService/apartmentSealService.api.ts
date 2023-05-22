import { axios } from '01/axios';
import { IndividualDeviceListItemResponsePagedList } from 'myApi';

export const getIndividualDevices = (
  ApartmentId?: number,
): Promise<IndividualDeviceListItemResponsePagedList> =>
  axios.get('IndividualDevices', { params: { ApartmentId } });
