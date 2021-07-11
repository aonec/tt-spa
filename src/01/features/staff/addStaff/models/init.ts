import { addStaff } from '01/_api/staff';
import { forward } from 'effector';
import { refetchStaff } from '../../displayStaff/models';
import {
  $isAddStaffModalVisible,
  addStaffButtonClicked,
  addStaffModalCloseButtonClicked,
  addStaffForm,
  addStaffFx,
  $isAddStaffFailed,
  addStaffModalButtonClicked,
} from './index';

$isAddStaffModalVisible
  .on(addStaffButtonClicked, () => true)
  .reset(addStaffModalCloseButtonClicked, addStaffFx.doneData);

$isAddStaffFailed
  .on(addStaffFx.failData, () => true)
  .reset(
    addStaffModalCloseButtonClicked,
    addStaffModalButtonClicked,
    addStaffForm.submit
  );

forward({
  from: addStaffForm.formValidated,
  to: addStaffFx,
});

forward({
  from: addStaffFx.doneData,
  to: [addStaffForm.reset, refetchStaff],
});

addStaffFx.use(addStaff);
