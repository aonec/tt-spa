import { axios } from '../../api/axios';
import { AddApartmentActRequest } from '../../api/types';

export const postApartmentAct = (payload: AddApartmentActRequest): Promise<void> =>
  axios.post('ApartmentActs', payload);
