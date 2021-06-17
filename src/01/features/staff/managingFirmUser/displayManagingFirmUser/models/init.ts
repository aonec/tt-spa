import {
  $isFetchingManagingFirmUserFailed,
  fetchManagingFirmUserFx,
} from './index';
import { $managingFirmUser } from '.';

$managingFirmUser.on(fetchManagingFirmUserFx.doneData, (_, user) => user);
