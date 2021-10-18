import { putHomeownerAccount } from './../../../../_api/homeowners';
import {
  openEditPersonalNumberTypeModal,
  closeEditPersonalNumberTypeModal,
  personalNumberEditForm,
  $editRequestStatus,
  setEditRequestStatus,
  editHomeownerAccountEffect,
  editHomeownerSaveButtonClicked,
} from './index';
import { $isSelectEditPersonalNumberTypeModalOpen } from '.';
import { combine, forward, sample } from 'effector';
import { $homeowner, fetchHomeowner } from '../../displayHomeowner/models';

editHomeownerAccountEffect.use(putHomeownerAccount);

$isSelectEditPersonalNumberTypeModalOpen
  .on(openEditPersonalNumberTypeModal, () => true)
  .reset(closeEditPersonalNumberTypeModal);

forward({
  from: fetchHomeowner.doneData.map(
    ({ name, phoneNumber, personalAccountNumber, paymentCode, openAt }) =>
      ({
        name,
        phoneNumber,
        personalAccountNumber,
        paymentCode,
        isMainAccountingNumber: false,
        openAt,
      } as any)
  ),
  to: personalNumberEditForm.setForm,
});

$editRequestStatus.on(setEditRequestStatus, (_, status) => status);

$editRequestStatus
  .on(editHomeownerAccountEffect.doneData, () => 'done')
  .on(editHomeownerAccountEffect.failData, () => 'failed');

sample({
  source: combine(
    $homeowner,
    personalNumberEditForm.$values,
    (homeowner, { personalAccountNumber, paymentCode, name, phoneNumber }) => ({
      id: homeowner?.id,
      data: { personalAccountNumber, paymentCode, name, phoneNumber },
    })
  ),
  clock: editHomeownerSaveButtonClicked,
  target: editHomeownerAccountEffect as any,
});
