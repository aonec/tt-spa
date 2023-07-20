import { axios } from 'api/axios';
import { AddApartmentActRequest } from 'api/myApi';

export const postApartmentAct = (
  payload: AddApartmentActRequest,
): Promise<void> => axios.post('ApartmentActs', payload);
