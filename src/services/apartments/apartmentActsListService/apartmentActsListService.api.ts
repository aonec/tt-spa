import { axios } from '01/axios';
import {
  ApartmentActResponse,
} from 'myApi';

export const getapartmentActsList = async (
  apartmentId: number
): Promise<ApartmentActResponse[] | null> => 
  axios.get(`Apartments/${apartmentId}/Acts`);



