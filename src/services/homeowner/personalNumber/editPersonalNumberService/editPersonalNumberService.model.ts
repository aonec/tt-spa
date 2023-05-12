import { message } from 'antd';
import { createDomain, sample } from 'effector';
import {
  HomeownerAccountCloseRequest,
  HomeownerAccountUpdateRequest,
} from 'myApi';
import {
  EffectFailDataAxiosError,
  EffectFailDataAxiosErrorDataApartmentId,
} from 'types';
import {
  closeHomeownerAccount,
  putHomeownerAccount,
} from './editPersonalNumberService.api';
import { PersonalNumberFormTypes } from '../components/PersonalNumberForm/PersonalNumberForm.types';
import { apartmentProfileService } from 'services/apartments/apartmentProfileService';

const domain = createDomain('editPersonalNumberService');

const onForced = domain.createEvent();

const handleConfirmationModalClose = domain.createEvent();

const handleEditHomeownerAccount =
  domain.createEvent<PersonalNumberFormTypes>();

const $isForced = domain
  .createStore<boolean>(false)
  .on(onForced, () => true)
  .reset(handleConfirmationModalClose);

const editHomeownerAccountEffect = domain.createEffect<
  { id: string; data: HomeownerAccountUpdateRequest },
  void,
  EffectFailDataAxiosErrorDataApartmentId
>(putHomeownerAccount);

const closeHomeownerAccountFx = domain.createEffect<
  HomeownerAccountCloseRequest,
  void,
  EffectFailDataAxiosError
>(closeHomeownerAccount);

const $samePersonalAccountNumderId = domain
  .createStore<number | null>(null)
  .on(editHomeownerAccountEffect.failData, (prev, errData) => {
    if (errData.response.status === 409) {
      return errData.response.data.error.Data.ApartmentId;
    }
    return prev;
  })
  .reset(handleConfirmationModalClose);

const $isConfirmationModalOpen = $samePersonalAccountNumderId.map(Boolean);

sample({
  clock: handleEditHomeownerAccount,
  source: $isForced,
  filter: (_, formData) => Boolean(formData.homeownerId),
  fn: (isForced, formData) =>
    ({
      id: formData.homeownerId,
      data: {
        personalAccountNumber: formData.personalAccountNumber,
        paymentCode: formData.paymentCode,
        name: formData.name,
        phoneNumber: formData.phoneNumber,
        IsMainOnApartment: formData.isMainOnApartment,
        isForced: isForced,
      },
    } as {
      id: string;
      data: HomeownerAccountUpdateRequest;
    }),
  target: editHomeownerAccountEffect,
});

const $isLoading = editHomeownerAccountEffect.pending;

const successEditHomeownerAccount = editHomeownerAccountEffect.doneData;

successEditHomeownerAccount.watch(() => message.success('Успешно обновлен'));

editHomeownerAccountEffect.failData.watch((error) => {
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

closeHomeownerAccountFx.failData.watch((error) => {
  return message.error(
    error.response.data.error.Text ||
      error.response.data.error.Message ||
      'Произошла ошибка',
  );
});

export const editPersonalNumberService = {
  inputs: {
    handleEditHomeownerAccount,
    successEditHomeownerAccount,
    handleConfirmationModalClose,
    onForced,
  },
  outputs: {
    $isLoading,
    $apartment: apartmentProfileService.outputs.$apartment,
    $samePersonalAccountNumderId,
    $isConfirmationModalOpen,
  },
  gates: { ApartmentGate: apartmentProfileService.gates.ApartmentGate },
};
