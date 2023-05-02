import { createDomain, forward } from 'effector';
import { HomeownerAccountCreateRequest } from 'myApi';
import { apartmentProfileService } from 'services/apartments/apartmentProfileService';
import { EffectFailDataAxiosErrorDataApartmentId } from 'types';
import { addHomeowner } from './addPersonalNumberService.api';
import { message } from 'antd';

const domain = createDomain('addPersonalNumberService');

const handleAddPersonalNumber =
  domain.createEvent<HomeownerAccountCreateRequest>();

const addPersonalNumberFx = domain.createEffect<
  HomeownerAccountCreateRequest,
  void,
  EffectFailDataAxiosErrorDataApartmentId
>(addHomeowner);

forward({ from: handleAddPersonalNumber, to: addPersonalNumberFx });

const $isLoading = addPersonalNumberFx.pending;

const successAddPersonalNumber = addPersonalNumberFx.doneData;

successAddPersonalNumber.watch(() =>
  message.success('Лицевой счет успешно изменен'),
);

addPersonalNumberFx.failData.watch((error) => {
  return message.error(
    error.response.data.error.Text ||
      error.response.data.error.Message ||
      'Произошла ошибка',
  );
});

export const addPersonalNumberService = {
  inputs: { handleAddPersonalNumber, successAddPersonalNumber },
  outputs: {
    $apartment: apartmentProfileService.outputs.$apartment,
    $isLoading,
  },
  gates: { ApartmentGate: apartmentProfileService.gates.ApartmentGate },
};
