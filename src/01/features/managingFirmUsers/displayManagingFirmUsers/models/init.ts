import { forward } from 'effector';
import { fetchManagingFirmUsersFx } from './index';
import { ManagingFirmUsersGate } from '.';

forward({
  from: ManagingFirmUsersGate.open,
  to: fetchManagingFirmUsersFx,
});
