import { axios } from '01/axios';
import { ApartmentResponse } from 'myApi';
import { PutApartment } from './editApartmentProfileService.types';

export const getApartment = (apartmentId: number): Promise<ApartmentResponse> =>
  axios.get(`Apartments/${apartmentId}`);

export const putApartment = ({
  ApartmentId,
  ...params
}: PutApartment): Promise<ApartmentResponse> =>
  axios.put(`Apartments/${ApartmentId}`, params);
