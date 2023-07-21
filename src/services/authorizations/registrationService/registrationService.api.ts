import { axios } from 'api/axios';
import { ConfirmRequest } from 'api/types';

export const confirmRegistration = (request: ConfirmRequest): Promise<void> =>
  axios.post(`Auth/confirm`, request);
