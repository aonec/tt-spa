import { forward, guard } from 'effector';
import { fetchUserRoles } from '01/_api/userRoles';
import {
  $isFetchingUserRolesFailed,
  $userRoles,
  fetchUserRolesFx,
  UserRolesGate,
} from './index';

fetchUserRolesFx.use(fetchUserRoles);

$userRoles.on(fetchUserRolesFx.doneData, (_, userRoles) => {
  return userRoles;
});

$isFetchingUserRolesFailed
  .on(fetchUserRolesFx.failData, () => true)
  .reset(fetchUserRolesFx.doneData);

forward({
  from: guard({
    clock: UserRolesGate.open,
    source: $userRoles,
    filter: (userRoles) => userRoles === null,
  }),
  to: fetchUserRolesFx,
});
