import { axios } from 'api/axios';
import { LoginRequest, TokenResponse } from 'api/myApi';

export const loginPost = (payload: LoginRequest): Promise<TokenResponse> =>
  axios.post('Auth/login', payload);
