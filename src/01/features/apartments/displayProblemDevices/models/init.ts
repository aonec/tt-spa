import { getProblemDevices, GetProblemDevicesRequestPayload } from './../../../../_api/apartments';
import {
  ProblemDevicesGate,
  fetchProblemDevicesFx,
  $problemDevices,
} from './index';
import { forward } from 'effector';

fetchProblemDevicesFx.use(getProblemDevices);

$problemDevices.on(fetchProblemDevicesFx.doneData, (_, devices) => devices);

forward({
  from: ProblemDevicesGate.open,
  to: fetchProblemDevicesFx,
});
