import { getIndividualDevices } from '01/_api/individualDevices';
import { guard, sample } from 'effector';
import {
  $individualDevices,
  fetchIndividualDeviceFxs,
  IndividualDevicesGate,
  refetchIndividualDevices,
} from '.';
import { toArray } from '../../addIndividualDevice/components/CheckFormValuesModal';

fetchIndividualDeviceFxs.use(getIndividualDevices);

$individualDevices.on(fetchIndividualDeviceFxs.doneData, (_, devices) => devices);

const refetchEffect = guard({
  source: IndividualDevicesGate.state.map((elem) => elem),
  clock: IndividualDevicesGate.state,
  filter: (value) => toArray(value).some(Boolean),
  target: fetchIndividualDeviceFxs,
});

sample({
  source: IndividualDevicesGate.state.map((elem) => elem),
  clock: refetchIndividualDevices,
  target: fetchIndividualDeviceFxs,
});
