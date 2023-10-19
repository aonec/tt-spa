import { createEffect, createEvent, createStore } from 'effector';
import { sample } from 'effector';
import { replaceHomeownerAccount } from './switchPersonalNumberService.api';
import { EffectFailDataAxiosErrorDataApartmentId } from 'types';
import { HomeownerAccountReplaceRequest } from 'api/types';
import { PersonalNumberFormTypes } from '../components/PersonalNumberForm/PersonalNumberForm.types';
import { message } from 'antd';
import { apartmentProfileService } from 'services/apartments/apartmentProfileService';

const onForced = createEvent();

const handleConfirmationModalClose = createEvent();

const handleSwitchHomeownerAccount = createEvent<{
  replaceableAccountId: string;
  form: PersonalNumberFormTypes;
}>();

const $isForced = createStore<boolean>(false)
  .on(onForced, () => true)
  .reset(handleConfirmationModalClose);

const switchHomeownerAccountFx = createEffect<
  HomeownerAccountReplaceRequest,
  void,
  EffectFailDataAxiosErrorDataApartmentId
>(replaceHomeownerAccount);

const $samePersonalAccountNumderId = createStore<number | null>(null)
  .on(switchHomeownerAccountFx.failData, (prev, errData) => {
    if (errData.response.status === 409) {
      return errData.response.data.error.Data.ApartmentId;
    }
    return prev;
  })
  .reset(handleConfirmationModalClose);

const $isConfirmationModalOpen = $samePersonalAccountNumderId.map(Boolean);

sample({
  clock: handleSwitchHomeownerAccount,
  source: $isForced,
  filter: (_, formData) => Boolean(formData.form.homeownerId),
  fn: (isForced, formData) =>
    ({
      replaceableAccountId: formData.replaceableAccountId,
      newHomeownerAccount: formData.form,
      isForced: isForced,
    } as HomeownerAccountReplaceRequest),
  target: switchHomeownerAccountFx,
});

const $isLoading = switchHomeownerAccountFx.pending;

const successSwitchHomeownerAccount = switchHomeownerAccountFx.doneData;

successSwitchHomeownerAccount.watch(() => message.success('Успешно обновлен'));

switchHomeownerAccountFx.failData.watch((error) => {
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

export const switchPersonalNumberService = {
  inputs: {
    successSwitchHomeownerAccount,
    handleSwitchHomeownerAccount,
    handleConfirmationModalClose,
    onForced,
  },
  outputs: {
    $isLoading,
    $isConfirmationModalOpen,
    $samePersonalAccountNumderId,
    $apartment: apartmentProfileService.outputs.$apartment,
  },
  gates: { ApartmentGate: apartmentProfileService.gates.ApartmentGate },
};
