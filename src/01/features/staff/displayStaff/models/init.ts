import { forward, guard } from 'effector';
import {
  $isFetchingStaffFailed,
  $staffList,
  fetchStaffFx,
  refetchStaff,
  StaffGate,
} from '.';
import { fetchStaff } from '../../../../_api/staff';

$staffList.on(fetchStaffFx.doneData, (_, staffList) => staffList);

$isFetchingStaffFailed
  .on(fetchStaffFx.failData, () => true)
  .reset(fetchStaffFx.doneData);

fetchStaffFx.use(fetchStaff);

forward({
  from: guard({
    source: $staffList,
    clock: StaffGate.open,
    filter: (staffList) => staffList === null,
  }),
  to: fetchStaffFx,
});

forward({
  from: refetchStaff,
  to: fetchStaffFx,
});
