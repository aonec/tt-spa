import { message } from 'antd';
import { combine, createDomain, forward, sample } from 'effector';
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

const domain = createDomain('editPersonalNumberService');

const onForced = domain.createEvent();

const handleConfirmationModalClose = domain.createEvent();

const handleEditHomeownerAccount =
  domain.createEvent<PersonalNumberFormTypes>();

const handleWithOnForcedEditHomeownerAccount = domain.createEvent();

forward({
  from: [handleEditHomeownerAccount, onForced],
  to: handleWithOnForcedEditHomeownerAccount,
});

const $editHomeownerAccountFormData = domain
  .createStore<PersonalNumberFormTypes | null>(null)
  .on(handleEditHomeownerAccount, (_, form) => form);

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
  clock: handleWithOnForcedEditHomeownerAccount,
  source: combine(
    $isForced,
    $editHomeownerAccountFormData,
    (isForced, formData) => ({
      id: formData?.homeownerId,
      data: {
        personalAccountNumber: formData?.personalAccountNumber,
        paymentCode: formData?.paymentCode,
        name: formData?.name,
        phoneNumber: formData?.phoneNumber,
        IsMainOnApartment: formData?.isMainOnApartment,
        isForced: isForced,
      } as HomeownerAccountUpdateRequest,
    }),
  ),
  target: editHomeownerAccountEffect,
});

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
  inputs: {},
  outputs: {},
};
