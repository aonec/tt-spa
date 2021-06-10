import { guard, sample } from 'effector';
import {
  $deletionUserId,
  $isDeletionStaffFailed,
  deleteStaffButtonClicked,
  deleteStaffConfirmButtonClicked,
  deleteStaffFx,
  delteStaffModalCancelButtonClicked,
} from '.';

$deletionUserId
  .on(deleteStaffButtonClicked, (_, id) => id)
  .reset(delteStaffModalCancelButtonClicked, deleteStaffFx.doneData);

$isDeletionStaffFailed
  .on(deleteStaffFx.failData, () => true)
  .reset(delteStaffModalCancelButtonClicked);

guard({
  source: $deletionUserId,
  clock: deleteStaffConfirmButtonClicked,
  filter: (id): id is number => id === null,
  target: deleteStaffFx,
});
