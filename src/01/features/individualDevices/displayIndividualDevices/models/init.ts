import { getIndividualDevices } from '01/_api/individualDevices';
import { guard } from 'effector';
import {
  $individualDevices,
  fetchIndividualDevices,
  IndividualDevicesGate,
} from '.';
import { toArray } from '../../addIndividualDevice/components/CheckFormValuesModal';

fetchIndividualDevices.use(getIndividualDevices);

$individualDevices.on(fetchIndividualDevices.doneData, (_, devices) => devices);

guard({
  source: IndividualDevicesGate.state.map((elem) => elem),
  clock: IndividualDevicesGate.state,
  filter: (value) => toArray(value).some(Boolean),
  target: fetchIndividualDevices,
});
