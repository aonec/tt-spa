import { sample, combine, forward } from 'effector';
import {
  editStaffStatusButtonClicked,
  editStaffStatusCancelButtonClicked,
  editStaffStatusForm,
  editStaffStatusFx,
} from './index';
import { $editStaffStatusUserId } from '.';

$editStaffStatusUserId
  .on(editStaffStatusButtonClicked, (_, user) => user.id)
  .reset(editStaffStatusCancelButtonClicked);

editStaffStatusForm.$values.on(
  editStaffStatusButtonClicked,
  (state, { status }) => {
    if (status) {
      return {
        type: status.type,
        startDate: status.startDate,
        endDate: status.startDate,
      };
    }

    return state;
  }
);

forward({
  from: editStaffStatusCancelButtonClicked,
  to: editStaffStatusForm.resetValues,
});

editStaffStatusFx.use(console.log);

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
  target: editStaffStatusFx,
});
