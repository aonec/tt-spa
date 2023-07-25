import { axios } from 'api/axios';
import { ApartmentResponse } from 'api/types';

export const getApartment = (apartmentId: number): Promise<ApartmentResponse> =>
  axios.get(`Apartments/${apartmentId}`);
