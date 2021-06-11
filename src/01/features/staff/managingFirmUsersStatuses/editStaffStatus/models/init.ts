import {
  editStaffStatusButtonClicked,
  editStaffStatusCancelButtonClicked,
} from './index';
import { $editStaffStatusUserId } from '.';

$editStaffStatusUserId
  .on(editStaffStatusButtonClicked, (_, id) => id)
  .reset(editStaffStatusCancelButtonClicked);

