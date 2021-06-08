import { forward } from 'effector';
import { fetchUserRoles } from '01/_api/userRoles';
import {
  $isFetchingUserRolesFailed,
  $userRoles,
  fetchUserRolesFx,
  UserRolesGate,
} from './index';

fetchUserRolesFx.use(fetchUserRoles);

$userRoles.on(fetchUserRolesFx.doneData, (_, userRoles) => userRoles);

$isFetchingUserRolesFailed
  .on(fetchUserRolesFx.failData, () => true)
  .reset(fetchUserRolesFx.doneData);

forward({
  from: UserRolesGate.open,
  to: fetchUserRolesFx,
});
