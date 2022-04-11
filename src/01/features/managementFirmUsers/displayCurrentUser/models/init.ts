import {
  $currentManagingFirmUser,
  CurrentManagingFirmUserGate,
  fetchCurrentManagingFirmUser,
} from './index';
import { forward, guard } from 'effector';
import { getCurrentManagingFirmUser } from '01/_api/managingFirmUser';

fetchCurrentManagingFirmUser.use(getCurrentManagingFirmUser);

$currentManagingFirmUser.on(
  fetchCurrentManagingFirmUser.doneData,
  (_, user) => user
);

guard({
  source: $currentManagingFirmUser,
  clock: CurrentManagingFirmUserGate.open,
  filter: (user) => !user,
  target: fetchCurrentManagingFirmUser,
});
