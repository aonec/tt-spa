import { getIndividualDevices } from '01/_api/individualDevices';
import { forward } from 'effector';
import {
  $individualDevices,
  fetchIndividualDevices,
  IndividualDevicesGate,
} from '.';

fetchIndividualDevices.use(getIndividualDevices);

$individualDevices.on(fetchIndividualDevices.doneData, (_, devices) => devices);

forward({
  from: IndividualDevicesGate.state,
  to: fetchIndividualDevices,
});
