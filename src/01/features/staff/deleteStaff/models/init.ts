import { deleteManagingFirmUser } from '01/_api/staff';
import { combine, guard, sample } from 'effector';
import {
  $userIdToDelete,
  $isDeletionStaffFailed,
  deleteStaffButtonClicked,
  deleteStaffConfirmButtonClicked,
  deleteStaffFx,
  deleteStaffModalCancelButtonClicked,
} from '.';
import { $staffList } from '../../displayStaff/models';

deleteStaffFx.use(deleteManagingFirmUser);

const staffUserDeleted = sample({
  source: combine($userIdToDelete, $staffList),
  clock: deleteStaffFx.doneData,
  fn: ([idToDelete, users]) =>
    users?.filter((elem) => elem.id !== idToDelete) || null,
  target: $staffList,
});

$userIdToDelete
  .on(deleteStaffButtonClicked, (_, id) => id)
  .reset(deleteStaffModalCancelButtonClicked, staffUserDeleted);

$isDeletionStaffFailed
  .on(deleteStaffFx.failData, () => true)
  .reset(deleteStaffModalCancelButtonClicked);

guard({
  source: $userIdToDelete,
  clock: deleteStaffConfirmButtonClicked,
  filter: (id): id is number => id !== null,
  target: deleteStaffFx,
});
