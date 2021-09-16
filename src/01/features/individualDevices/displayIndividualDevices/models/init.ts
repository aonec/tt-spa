import { getIndividualDevices } from '01/_api/individualDevices';
import { guard, sample } from 'effector';
import {
  $individualDevices,
  $isShownClosedDevices,
  fetchIndividualDeviceFxs,
  hideClosedDevices,
  IndividualDevicesGate,
  refetchIndividualDevices,
  resetIndividualDevices,
  showClosedDevices,
} from '.';
import { toArray } from '../../addIndividualDevice/components/CheckFormValuesModal';

fetchIndividualDeviceFxs.use(getIndividualDevices);

$individualDevices
  .on(fetchIndividualDeviceFxs.doneData, (_, devices) => devices)
  .reset(resetIndividualDevices, IndividualDevicesGate.close);

guard({
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

$isShownClosedDevices
  .on(showClosedDevices, () => true)
  .reset(hideClosedDevices);
