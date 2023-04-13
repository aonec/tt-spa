import { axios } from '01/axios';
import { ConfirmRequest } from 'myApi';

export const confirmRegistration = (request: ConfirmRequest): Promise<void> =>
  axios.post(`Auth/confirm`, request);
