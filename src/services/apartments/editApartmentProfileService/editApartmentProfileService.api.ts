import { axios } from 'api/axios';
import { ApartmentResponse } from 'api/myApi';
import { PutApartment } from './editApartmentProfileService.types';

export const getApartment = (apartmentId: number): Promise<ApartmentResponse> =>
  axios.get(`Apartments/${apartmentId}`);

export const putApartment = ({
  ApartmentId,
  ...params
}: PutApartment): Promise<ApartmentResponse> => {
  return axios.put(`Apartments/${ApartmentId}`, params);
};
