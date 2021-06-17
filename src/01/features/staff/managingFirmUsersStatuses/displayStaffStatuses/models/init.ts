import { fetchStatuses } from '../../../../../_api/staffStatuses';
import { forward, guard } from 'effector';
import {
  $isFetchingStaffStatusesFailed,
  $staffStatuses,
  fetchStaffStatusesFx,
  StaffStatusesGate,
} from '.';

$staffStatuses.on(fetchStaffStatusesFx.doneData, (_, staffList) => staffList);

$isFetchingStaffStatusesFailed
  .on(fetchStaffStatusesFx.failData, () => true)
  .reset(fetchStaffStatusesFx.doneData);

fetchStaffStatusesFx.use(fetchStatuses);

forward({
  from: guard({
    source: $staffStatuses,
    clock: StaffStatusesGate.open,
    filter: (staffStatusesList) => staffStatusesList === null,
  }),
  to: fetchStaffStatusesFx,
});
