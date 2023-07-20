import { createDomain, forward } from 'effector';
import { confirmRegistration } from './registrationService.api';
import { ConfirmRequest } from 'api/types';
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
const successRegistration = confirmRegistrationFx.doneData;

$isLoading.watch(
  (isLoading) =>
    isLoading &&
    message.loading({
      key: 'confirm',
      content: 'Попытка подтверждения пользователя',
    }),
);

confirmRegistrationFx.failData.watch((error) => {
  setTimeout(() => message.destroy('confirm'), 500);

  setTimeout(
    () =>
      message.error(
        error.response.data.error.Text ||
          error.response.data.error.Message ||
          'Произошла ошибка',
      ),
    1000,
  );
});

successRegistration.watch(() => {
  message.destroy();
  message.info('Войдите в систему');
});

export const registrationService = {
  inputs: { handleConfirmRegistration, successRegistration },
  outputs: { $isLoading },
};
