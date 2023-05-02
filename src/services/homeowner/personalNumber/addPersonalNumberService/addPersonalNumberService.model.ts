import { createDomain, forward, sample } from 'effector';
import { HomeownerAccountCreateRequest } from 'myApi';
import { apartmentProfileService } from 'services/apartments/apartmentProfileService';
import { EffectFailDataAxiosErrorDataApartmentId } from 'types';
import { addHomeowner } from './addPersonalNumberService.api';
import { message } from 'antd';
import { PersonalNumberFormTypes } from '../components/PersonalNumberForm/PersonalNumberForm.types';

const domain = createDomain('addPersonalNumberService');

const handleAddPersonalNumber = domain.createEvent<PersonalNumberFormTypes>();

const addPersonalNumberFx = domain.createEffect<
  HomeownerAccountCreateRequest,
  void,
  EffectFailDataAxiosErrorDataApartmentId
>(addHomeowner);

sample({
  clock: handleAddPersonalNumber,
  filter: (data) => Boolean(data.apartmentId),
  fn: (data) =>
    ({
      apartmentId: data.apartmentId,
      name: data.name,
      openAt: data.openAt,
      personalAccountNumber: data.personalAccountNumber,
      isMainOnApartment: data.isMainOnApartment,
      paymentCode: data.paymentCode,
      phoneNumber: data.phoneNumber,
    } as HomeownerAccountCreateRequest),
  target: addPersonalNumberFx,
});

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
