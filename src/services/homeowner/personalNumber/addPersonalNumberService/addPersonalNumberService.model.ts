import { createEffect, createEvent, createStore } from 'effector';
import { sample } from 'effector';
import { message } from 'antd';
import { apartmentProfileService } from 'services/apartments/apartmentProfileService';
import { EffectFailDataAxiosErrorDataApartmentId } from 'types';
import { addHomeowner } from './addPersonalNumberService.api';
import { PersonalNumberFormTypes } from '../components/PersonalNumberForm/PersonalNumberForm.types';
import { AddHomeownerRequestPayload } from './addPersonalNumberService.types';

const handleAddPersonalNumber = createEvent<PersonalNumberFormTypes>();

const onForced = createEvent();
const handleConfirmationModalClose = createEvent();
const $isForced = createStore<boolean>(false)
  .on(onForced, () => true)
  .reset(handleConfirmationModalClose);

const addPersonalNumberFx = createEffect<
  AddHomeownerRequestPayload,
  void,
  EffectFailDataAxiosErrorDataApartmentId
>(addHomeowner);

const $samePersonalAccountNumderId = createStore<number | null>(null)
  .on(addPersonalNumberFx.failData, (prev, errData) => {
    if (errData.response.status === 409) {
      return errData.response.data.error.Data.ApartmentId;
    }
    return prev;
  })
  .reset(handleConfirmationModalClose);

const $isConfirmationModalOpen = $samePersonalAccountNumderId.map(Boolean);

sample({
  clock: handleAddPersonalNumber,
  source: $isForced,
  filter: (_, formData) => Boolean(formData.apartmentId),
  fn: (isForced, formData) =>
    ({
      body: {
        apartmentId: formData.apartmentId,
        name: formData.name,
        openAt: formData.openAt,
        personalAccountNumber: formData.personalAccountNumber,
        isMainOnApartment: formData.isMainOnApartment,
        paymentCode: formData.paymentCode,
        phoneNumber: formData.phoneNumber,
      },
      isForced,
    } as AddHomeownerRequestPayload),
  target: addPersonalNumberFx,
});

const $isLoading = addPersonalNumberFx.pending;

const successAddPersonalNumber = addPersonalNumberFx.doneData;

successAddPersonalNumber.watch(() =>
  message.success('Лицевой счет успешно изменен'),
);

addPersonalNumberFx.failData.watch((error) => {
  if (
    error.response.data.error.Code === 'HomeownerAccountAlreadyExistConflict'
  ) {
    return;
  }

  return message.error(
    error.response.data.error.Text ||
      error.response.data.error.Message ||
      'Произошла ошибка',
  );
});

export const addPersonalNumberService = {
  inputs: {
    handleAddPersonalNumber,
    successAddPersonalNumber,
    handleConfirmationModalClose,
    onForced,
  },
  outputs: {
    $apartment: apartmentProfileService.outputs.$apartment,
    $isLoading,
    $isConfirmationModalOpen,
    $samePersonalAccountNumderId,
  },
  gates: { ApartmentGate: apartmentProfileService.gates.ApartmentGate },
};
