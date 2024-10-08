import { axios } from 'api/axios';
import {
  ApartmentResponse,
  IndividualDeviceListItemResponsePagedList,
} from 'api/types';

export const fetchApartment = (id: number): Promise<ApartmentResponse> =>
  axios.get(`Apartments/${id}`);

export const fetchIndividualDevices = (
  apartmentId: number,
): Promise<IndividualDeviceListItemResponsePagedList> =>
  axios.get('IndividualDevices', { params: { apartmentId } });
