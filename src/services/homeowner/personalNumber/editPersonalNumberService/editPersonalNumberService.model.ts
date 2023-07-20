import { message } from 'antd';
import { createDomain, forward, sample } from 'effector';
import {
  HomeownerAccountCloseRequest,
  HomeownerAccountUpdateRequest,
} from 'api/types';
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

const handleCloseHomeownerAccount =
  domain.createEvent<HomeownerAccountCloseRequest>();

const setVisibleCloseHomeownerAccountModal = domain.createEvent<boolean>();

const closeHomeownerAccountFx = domain.createEffect<
  HomeownerAccountCloseRequest,
  void,
  EffectFailDataAxiosError
>(closeHomeownerAccount);

const $isVisibleCloseHomeownerAccountModal = domain
  .createStore<boolean>(false)
  .on(setVisibleCloseHomeownerAccountModal, (_, data) => data)
  .reset(closeHomeownerAccountFx.doneData);

const $isForced = domain
  .createStore<boolean>(false)
  .on(onForced, () => true)
  .reset(handleConfirmationModalClose);

const editHomeownerAccountFx = domain.createEffect<
  { id: string; data: HomeownerAccountUpdateRequest },
  void,
  EffectFailDataAxiosErrorDataApartmentId
>(putHomeownerAccount);

const $samePersonalAccountNumderId = domain
  .createStore<number | null>(null)
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
        isForced: isForced,
      },
    } as {
      id: string;
      data: HomeownerAccountUpdateRequest;
    }),
  target: editHomeownerAccountFx,
});

forward({
  from: handleCloseHomeownerAccount,
  to: closeHomeownerAccountFx,
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
