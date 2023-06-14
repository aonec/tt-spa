import { axios } from '01/axios';
import { ApartmentResponse } from 'myApi';

export const getApartment = (id: number): Promise<ApartmentResponse> => {
  return axios.get(`Apartments/${id}`);
};
