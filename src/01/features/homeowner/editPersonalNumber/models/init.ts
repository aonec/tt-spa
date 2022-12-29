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
} from './index';
import { $isSelectEditPersonalNumberTypeModalOpen } from '.';
import { combine, forward, sample } from 'effector';
import { $homeowner, fetchHomeownerFx } from '../../displayHomeowner/models';
import moment from 'moment';
import { fetchApartmentFx } from '01/features/apartments/displayApartment/models';
import { HomeownerGate } from '../../displayHomeowner/models/index';

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
      (account) => account.id === gateState.id
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

sample({
  source: combine(
    $homeowner,
    personalNumberEditForm.$values,
    (
      homeowner,
      {
        personalAccountNumber,
        paymentCode,
        name,
        phoneNumber,
        openAt,
        isMainAccountingNumber,
      }
    ) => ({
      id: homeowner?.id,
      data: {
        personalAccountNumber,
        paymentCode,
        name,
        phoneNumber,
        openAt,
        IsMainOnApartment: isMainAccountingNumber,
      },
    })
  ),
  clock: editHomeownerSaveButtonClicked,
  target: editHomeownerAccountEffect as any,
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
    $homeowner,
    (form, homeowner) =>
      ({
        ClosedAt: moment(form?.closedAt!).toISOString(true),
        HomeownerAccountId: homeowner?.id!,
      } as any)
  ),
  target: closeHomeownerAccountFx,
});
