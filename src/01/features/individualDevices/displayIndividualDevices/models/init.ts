import { getIndividualDevices } from '01/_api/individualDevices';
import { guard, sample } from 'effector';
import {
  $individualDevices,
  fetchIndividualDevices,
  IndividualDevicesGate,
  refetchIndividualDevices,
} from '.';
import { toArray } from '../../addIndividualDevice/components/CheckFormValuesModal';

fetchIndividualDevices.use(getIndividualDevices);

$individualDevices.on(fetchIndividualDevices.doneData, (_, devices) => devices);

const refetchEffect = guard({
  source: IndividualDevicesGate.state.map((elem) => elem),
  clock: IndividualDevicesGate.state,
  filter: (value) => toArray(value).some(Boolean),
  target: fetchIndividualDevices,
});

sample({
  source: IndividualDevicesGate.state.map((elem) => elem),
  clock: refetchIndividualDevices,
  target: fetchIndividualDevices,
});
