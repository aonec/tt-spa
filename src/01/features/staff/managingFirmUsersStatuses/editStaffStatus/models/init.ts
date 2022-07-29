import { refetchStaff } from './../../../displayStaff/models/index';
import { combine, forward, sample } from 'effector';
import {
  $isEditStaffStatusRequestFailed,
  editStaffStatusButtonClicked,
  editStaffStatusCancelButtonClicked,
  editStaffStatusForm,
  editStaffStatusFx,
} from './index';
import { $editStaffStatusUserId } from '.';
import { postManagingFirmUserStatus } from '../../../../../_api/editManagingFirmUserStatus';

$editStaffStatusUserId
  .on(editStaffStatusButtonClicked, (_, user) => user.id)
  .reset(editStaffStatusCancelButtonClicked, editStaffStatusFx.doneData);

$isEditStaffStatusRequestFailed
  .on(editStaffStatusFx.failData, () => true)
  .reset(editStaffStatusFx.doneData);

forward({
  from: editStaffStatusButtonClicked.map((payload) => payload.status) as any,
  to: editStaffStatusForm.setForm,
});

forward({
  from: editStaffStatusFx.doneData,
  to: [refetchStaff, editStaffStatusForm.resetValues],
});

forward({
  from: editStaffStatusCancelButtonClicked,
  to: editStaffStatusForm.resetValues,
});

const $postStaffStatusPayload = combine(
  $editStaffStatusUserId,
  editStaffStatusForm.$values,
  (userId, { type, startDate, endDate }) => ({
    userId,
    type,
    startDate,
    endDate,
  })
);

sample({
  source: $postStaffStatusPayload,
  clock: editStaffStatusForm.formValidated,
  target: editStaffStatusFx as any,
});

editStaffStatusFx.use(postManagingFirmUserStatus as any);
