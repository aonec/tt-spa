import { createEffect, createEvent } from 'effector';
import { sample } from 'effector';
import { LoginRequest, TokenResponse } from 'api/types';
import { EffectFailDataAxiosError } from 'types';
import { loginPost } from './loginService.api';
import { message } from 'antd';
import { developmentSettingsService } from 'services/developmentSettings/developmentSettings.models';

const handlePostLogin = createEvent<LoginRequest>();

const postLoginFx = createEffect<
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

sample({ clock: handlePostLogin, target: postLoginFx });

export const loginService = {
  inputs: {
    handlePostLogin,
    successLogin,
    openDevSettingsModal:
      developmentSettingsService.inputs.openDevSettingsModal,
  },
  outputs: { $isLoading },
};
