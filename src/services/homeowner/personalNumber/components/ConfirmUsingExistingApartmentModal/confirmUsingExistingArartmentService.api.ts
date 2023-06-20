import { axios } from '01/axios';
import {
  ApartmentResponse,
  IndividualDeviceListItemResponsePagedList,
} from 'myApi';

export const fetchApartment = (id: number): Promise<ApartmentResponse> =>
  axios.get(`Apartments/${id}`);

export const fetchIndividualDevices = (
  apartmentId: number,
): Promise<IndividualDeviceListItemResponsePagedList> =>
  axios.get('IndividualDevices', { params: { apartmentId } });
