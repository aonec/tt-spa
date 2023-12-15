import { createEffect, createEvent, createStore } from 'effector';
import { message } from 'antd';
import { sample } from 'effector';
import { HomeownerAccountCloseRequest } from 'api/types';
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
import { EditHomeownerRequestPayload } from './editPersonalNumberService.types';

const onForced = createEvent();

const handleConfirmationModalClose = createEvent();

const handleEditHomeownerAccount = createEvent<PersonalNumberFormTypes>();

const handleCloseHomeownerAccount = createEvent<HomeownerAccountCloseRequest>();

const setVisibleCloseHomeownerAccountModal = createEvent<boolean>();

const closeHomeownerAccountFx = createEffect<
  HomeownerAccountCloseRequest,
  void,
  EffectFailDataAxiosError
>(closeHomeownerAccount);

const $isVisibleCloseHomeownerAccountModal = createStore<boolean>(false)
  .on(setVisibleCloseHomeownerAccountModal, (_, data) => data)
  .reset(closeHomeownerAccountFx.doneData);

const $isForced = createStore<boolean>(false)
  .on(onForced, () => true)
  .reset(handleConfirmationModalClose);

const editHomeownerAccountFx = createEffect<
  EditHomeownerRequestPayload,
  void,
  EffectFailDataAxiosErrorDataApartmentId
>(putHomeownerAccount);

const $samePersonalAccountNumderId = createStore<number | null>(null)
  .on(editHomeownerAccountFx.failData, (prev, errData) => {
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
      },
      isForced: isForced,
    } as EditHomeownerRequestPayload),
  target: editHomeownerAccountFx,
});

sample({
  clock: handleCloseHomeownerAccount,
  target: closeHomeownerAccountFx,
});

const $isLoading = editHomeownerAccountFx.pending;
const $isLoadingClosingAccount = closeHomeownerAccountFx.pending;

const successEditHomeownerAccount = editHomeownerAccountFx.doneData;
const successCloseHomeownerAccount = closeHomeownerAccountFx.doneData;

successEditHomeownerAccount.watch(() => message.success('Успешно обновлен'));

successCloseHomeownerAccount.watch(() =>
  message.success('Лицевой счёт закрыт'),
);

editHomeownerAccountFx.failData.watch((error) => {
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
    handleCloseHomeownerAccount,
    setVisibleCloseHomeownerAccountModal,
    successCloseHomeownerAccount,
  },
  outputs: {
    $isLoading,
    $apartment: apartmentProfileService.outputs.$apartment,
    $samePersonalAccountNumderId,
    $isConfirmationModalOpen,
    $isLoadingClosingAccount,
    $isVisibleCloseHomeownerAccountModal,
  },
  gates: { ApartmentGate: apartmentProfileService.gates.ApartmentGate },
};
