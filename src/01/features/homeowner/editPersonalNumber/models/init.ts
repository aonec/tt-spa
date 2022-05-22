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
  closeHomeownerAccountButtonClicked,
  closeHomeownerAccountForm,
} from './index';
import { $isSelectEditPersonalNumberTypeModalOpen } from '.';
import { combine, forward, sample } from 'effector';
import { $homeowner, fetchHomeownerFx } from '../../displayHomeowner/models';
import moment from 'moment';

editHomeownerAccountEffect.use(putHomeownerAccount);

closeHomeownerAccountFx.use(closeHomeownerAccount);

$isSelectEditPersonalNumberTypeModalOpen
  .on(openEditPersonalNumberTypeModal, () => true)
  .reset(closeEditPersonalNumberTypeModal);

fetchHomeownerFx.doneData.watch(
  ({ name, phoneNumber, personalAccountNumber, paymentCode, openAt }) => {
    const isAutocomplete = AutoCompleteFormGate.state.getState().autocomplete;

    if (!isAutocomplete) return;

    personalNumberEditForm.setForm({
      name,
      phoneNumber,
      personalAccountNumber,
      paymentCode,
      isMainAccountingNumber: false,
      openAt,
    } as any);
  }
);

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
      { personalAccountNumber, paymentCode, name, phoneNumber, openAt }
    ) => ({
      id: homeowner?.id,
      data: { personalAccountNumber, paymentCode, name, phoneNumber, openAt },
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
