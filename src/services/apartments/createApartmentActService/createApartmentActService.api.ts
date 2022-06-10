import { axios } from '01/axios';
import { AddApartmentActRequest } from 'myApi';

export const postApartmentAct = (payload: AddApartmentActRequest): Promise<void> =>
  axios.post('ApartmentActs', payload);
