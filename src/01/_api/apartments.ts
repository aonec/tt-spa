import { ApartmentResponse } from './../../myApi';
import axios from '01/axios';

export const getApartment = (id: number): Promise<ApartmentResponse> =>
  axios.get(`Apartment/${id}`);
