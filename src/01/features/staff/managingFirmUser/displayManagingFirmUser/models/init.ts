import { getManagingFirmUser } from './../../../../../_api/managingFirmUser';
import { guard, sample, combine } from 'effector';
import { fetchManagingFirmUserFx, ManagingFirmUserGate } from './index';
import { $managingFirmUser } from '.';

$managingFirmUser.on(fetchManagingFirmUserFx.doneData, (_, user) => user);

fetchManagingFirmUserFx.use(getManagingFirmUser);

sample({
  source: ManagingFirmUserGate.state.map((state) => state.id),
  clock: guard({
    source: combine(
      $managingFirmUser,
      ManagingFirmUserGate.state.map((state) => state.id),
      (user, id) => ({ user, id })
    ),
    clock: ManagingFirmUserGate.open,
    filter: ({ user, id }) => user?.id !== id,
  }),
  target: fetchManagingFirmUserFx,
});
