import { fetchStaff } from '01/_api/staff';
import { forward, guard } from 'effector';
import { $isFetchingStaffFailed, $staffList, fetchStaffFx, StaffGate } from '.';

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
