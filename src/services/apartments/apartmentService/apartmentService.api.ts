import { axios } from 'api/axios';
import { ApartmentResponse } from 'api/types';

export const getApartment = (id: number): Promise<ApartmentResponse> => {
  return axios.get(`Apartments/${id}`);
};
