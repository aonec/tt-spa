import { createDomain, forward } from 'effector';
import { LoginRequest, TokenResponse } from 'myApi';
import { EffectFailDataAxiosError } from 'types';
import { loginPost } from './loginService.api';
import { message } from 'antd';

const domain = createDomain('loginService');

const handlePostLogin = domain.createEvent<LoginRequest>();

const postLoginFx = domain.createEffect<
  LoginRequest,
  TokenResponse,
  EffectFailDataAxiosError
>(loginPost);

const $isLoading = postLoginFx.pending;

const successLogin = postLoginFx.doneData;

postLoginFx.failData.watch((error) => {
  return message.error(
    error.response.data.error.Text ||
      error.response.data.error.Message ||
      'Произошла ошибка',
  );
});

forward({ from: handlePostLogin, to: postLoginFx });

export const loginService = {
  inputs: { handlePostLogin, successLogin },
  outputs: { $isLoading },
};
