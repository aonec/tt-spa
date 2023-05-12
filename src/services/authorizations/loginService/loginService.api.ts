import { axios } from '01/axios';
import { LoginRequest, TokenResponse } from 'myApi';

export const loginPost = (payload: LoginRequest): Promise<TokenResponse> =>
  axios.post('Auth/login', payload);
