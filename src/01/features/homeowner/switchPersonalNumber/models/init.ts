import { setRequestStatus, switchPersonalNumber } from './index';
import { $switchRequestStatus } from '.';

$switchRequestStatus
  .on(setRequestStatus, (_, status) => status)
  .on(switchPersonalNumber.doneData, () => 'done')
  .on(switchPersonalNumber.failData, () => 'failed');
