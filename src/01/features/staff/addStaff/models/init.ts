import { addStaff } from '01/_api/staff';
import { forward } from 'effector';
import {
  isAddStaffModalVisible,
  addStaffButtonClicked,
  addStaffModalCloseButtonClicked,
  addStaffForm,
  addStaffFx,
} from './index';

isAddStaffModalVisible
  .on(addStaffButtonClicked, () => true)
  .reset(addStaffModalCloseButtonClicked);

forward({
  from: addStaffForm.formValidated,
  to: addStaffFx,
});

addStaffFx.use(addStaff);
