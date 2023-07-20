import { axios } from 'api/axios';
import { ApartmentResponse } from 'api/myApi';

export const getApartment = (id: number): Promise<ApartmentResponse> => {
  return axios.get(`Apartments/${id}`);
};
