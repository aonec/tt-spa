import {
  closeHomeownerAccount,
  putHomeownerAccount,
} from './../../../../_api/homeowners';
import {
  openEditPersonalNumberTypeModal,
  closeEditPersonalNumberTypeModal,
  personalNumberEditForm,
  $editRequestStatus,
  setEditRequestStatus,
  editHomeownerAccountEffect,
  editHomeownerSaveButtonClicked,
  AutoCompleteFormGate,
  PersonalNumberFormGate,
  $isVisibleCloseHomeonwerAccountModal,
  openCloseHomeonwerAccountModal,
  closeCloseHomeonwerAccountModal,
  closeHomeownerAccountFx,
  $closeHomeownerRequestStatus,
  resetCloseHomeownerRequestStatus,
  closeHomeownerAccountForm,
  $samePersonalAccountNumderId,
  handleConfirmationModalClose,
  $isForced,
  onForced,
  handleEditHomeownerAccount,
} from './index';
import { $isSelectEditPersonalNumberTypeModalOpen } from '.';
import { combine, forward, sample } from 'effector';
import moment from 'moment';
import { fetchApartmentFx } from '01/features/apartments/displayApartment/models';
import { HomeownerGate } from '../../displayHomeowner/models/index';
import { HomeownerAccountUpdateRequest } from 'myApi';

editHomeownerAccountEffect.use(putHomeownerAccount);

closeHomeownerAccountFx.use(closeHomeownerAccount);

$isSelectEditPersonalNumberTypeModalOpen
  .on(openEditPersonalNumberTypeModal, () => true)
  .reset(closeEditPersonalNumberTypeModal);

sample({
  clock: fetchApartmentFx.doneData,
  source: HomeownerGate.state,
  fn: (gateState, data) => {
    const isAutocomplete = AutoCompleteFormGate.state.getState().autocomplete;

    if (!isAutocomplete) return {};

    const currentAccount = data.homeownerAccounts?.find(
      (account) => account.id === gateState.id,
    );

    const form = {
      name: currentAccount?.name,
      phoneNumber: currentAccount?.phoneNumber,
      personalAccountNumber: currentAccount?.personalAccountNumber,
      paymentCode: currentAccount?.paymentCode,
      isMainAccountingNumber: currentAccount?.isMainPersonalAccountNumber,
      openAt: currentAccount?.openAt,
    };

    return form;
  },
  target: personalNumberEditForm.setForm,
});

$editRequestStatus.on(setEditRequestStatus, (_, status) => status);

$editRequestStatus
  .on(editHomeownerAccountEffect.doneData, () => 'done')
  .on(editHomeownerAccountEffect.failData, () => 'failed');

forward({
  from: editHomeownerSaveButtonClicked,
  to: personalNumberEditForm.submit,
});

forward({
  from: personalNumberEditForm.formValidated,
  to: handleEditHomeownerAccount,
});

forward({
  from: onForced,
  to: handleEditHomeownerAccount,
});

sample({
  clock: handleEditHomeownerAccount,
  source: combine(
    HomeownerGate.state,
    personalNumberEditForm.$values,
    $isForced,
    (
      gateState,
      {
        personalAccountNumber,
        paymentCode,
        name,
        phoneNumber,
        openAt,
        isMainAccountingNumber,
      },
      isForced,
    ) => ({
      id: gateState?.id,
      data: {
        personalAccountNumber,
        paymentCode,
        name,
        phoneNumber,
        openAt,
        IsMainOnApartment: isMainAccountingNumber,
        isForced: isForced,
      } as HomeownerAccountUpdateRequest,
    }),
  ),
  target: editHomeownerAccountEffect,
});

forward({
  from: PersonalNumberFormGate.close,
  to: personalNumberEditForm.reset,
});

$isVisibleCloseHomeonwerAccountModal
  .on(openCloseHomeonwerAccountModal, () => true)
  .reset(closeCloseHomeonwerAccountModal);

$closeHomeownerRequestStatus
  .on(closeHomeownerAccountFx.doneData, () => 'done')
  .on(closeHomeownerAccountFx.failData, () => 'failed')
  .reset(resetCloseHomeownerRequestStatus);

sample({
  clock: closeHomeownerAccountForm.formValidated,
  source: combine(
    closeHomeownerAccountForm.$values,
    HomeownerGate.state,
    (form, gateState) =>
      ({
        ClosedAt: moment(form?.closedAt).toISOString(true),
        HomeownerAccountId: gateState?.id,
      } as any),
  ),
  target: closeHomeownerAccountFx,
});

$samePersonalAccountNumderId
  .on(editHomeownerAccountEffect.failData, (prev, errData) => {
    if (errData.response.status === 409) {
      return errData.response.data.error.Data.ApartmentId;
    }
    return prev;
  })
  .reset(handleConfirmationModalClose);

$isForced.on(onForced, () => true).reset(handleConfirmationModalClose);

$samePersonalAccountNumderId.reset(handleConfirmationModalClose);

forward({
  from: editHomeownerAccountEffect.doneData,
  to: handleConfirmationModalClose,
});
