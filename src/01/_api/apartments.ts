import { ApartmentResponse } from './../../myApi';
import axios from '01/axios';

export const getApartment = async (id: number): Promise<ApartmentResponse> => {
  const res: any = await axios.get(`Apartments/${id}`);

  return res;
};
