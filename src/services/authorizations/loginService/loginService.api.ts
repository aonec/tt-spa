import { axios } from 'api/axios';
import { LoginRequest, TokenResponse } from 'api/types';

export const loginPost = (payload: LoginRequest): Promise<TokenResponse> =>
  axios.post('Auth/login', payload);
