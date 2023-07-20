import { axios } from 'api/axios';
import { ApartmentResponse } from 'myApi';

export const getApartment = (apartmentId: number): Promise<ApartmentResponse> =>
  axios.get(`Apartments/${apartmentId}`);
