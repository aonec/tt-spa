import { axios } from 'api/axios';
import { AddApartmentActRequest } from 'myApi';

export const postApartmentAct = (
  payload: AddApartmentActRequest,
): Promise<void> => axios.post('ApartmentActs', payload);
