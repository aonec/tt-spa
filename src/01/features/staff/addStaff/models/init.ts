import {
  isAddStaffModalVisible,
  addStaffButtonClicked,
  addStaffModalCloseButtonClicked,
} from './index';

isAddStaffModalVisible
  .on(addStaffButtonClicked, () => true)
  .reset(addStaffModalCloseButtonClicked);
