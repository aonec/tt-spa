import { axios } from 'api/axios';
import { ApartmentResponse } from 'api/myApi';

export const getApartment = (apartmentId: number): Promise<ApartmentResponse> =>
  axios.get(`Apartments/${apartmentId}`);
