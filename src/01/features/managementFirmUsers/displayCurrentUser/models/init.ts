import {
  $currentManagingFirmUser,
  CurrentManagingFirmUserGate,
  fetchCurrentManagingFirmUser,
} from './index';
import { forward } from 'effector';
import { getCurrentManagingFirmUser } from '01/_api/managingFirmUser';

fetchCurrentManagingFirmUser.use(getCurrentManagingFirmUser);

$currentManagingFirmUser.on(
  fetchCurrentManagingFirmUser.doneData,
  (_, user) => user
);

forward({
  from: CurrentManagingFirmUserGate.open,
  to: fetchCurrentManagingFirmUser,
});
