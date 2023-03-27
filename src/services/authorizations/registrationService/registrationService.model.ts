import { createDomain, forward } from 'effector';
import { confirmRegistration } from './registrationService.api';
import { ConfirmRequest } from 'myApi';
import { EffectFailDataAxiosError } from 'types';
import { message } from 'antd';

const domain = createDomain('registrationService');

const handleConfirmRegistration = domain.createEvent<ConfirmRequest>();

const confirmRegistrationFx = domain.createEffect<
  ConfirmRequest,
  void,
  EffectFailDataAxiosError
>(confirmRegistration);

forward({ from: handleConfirmRegistration, to: confirmRegistrationFx });

const $isLoading = confirmRegistrationFx.pending;

$isLoading.watch(
  (isLoading) =>
    isLoading && message.info('Попытка подтверждения пользователя'),
);

const successRegistration = confirmRegistrationFx.doneData;

confirmRegistrationFx.failData.watch((error) => {
  return message.error(
    error.response.data.error.Text ||
      error.response.data.error.Message ||
      'Произошла ошибка',
  );
});

export const registrationService = {
  inputs: { handleConfirmRegistration, successRegistration },
  outputs: { $isLoading },
};
