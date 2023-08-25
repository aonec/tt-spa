import { createDomain, sample } from 'effector';
import { replaceHomeownerAccount } from './switchPersonalNumberService.api';
import { EffectFailDataAxiosErrorDataApartmentId } from 'types';
import { HomeownerAccountReplaceRequest } from 'api/types';
import { PersonalNumberFormTypes } from '../components/PersonalNumberForm/PersonalNumberForm.types';
import { message } from 'antd';
import { apartmentProfileService } from 'services/apartments/apartmentProfileService';

const domain = createDomain('switchPersonalNumberService');

const onForced = domain.createEvent();

const handleConfirmationModalClose = domain.createEvent();

const handleSwitchHomeownerAccount = domain.createEvent<{
  replaceableAccountId: string;
  form: PersonalNumberFormTypes;
}>();

const $isForced = domain
  .createStore<boolean>(false)
  .on(onForced, () => true)
  .reset(handleConfirmationModalClose);

const switchHomeownerAccountFx = domain.createEffect<
  HomeownerAccountReplaceRequest,
  void,
  EffectFailDataAxiosErrorDataApartmentId
>(replaceHomeownerAccount);

const $samePersonalAccountNumderId = domain
  .createStore<number | null>(null)
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
