import { getIndividualDevices } from '01/_api/individualDevices';
import { guard, sample } from 'effector';
import {
  $individualDevices,
  $isShownClosedDevices,
  fetchIndividualDevicesFx,
  hideClosedDevices,
  IndividualDevicesGate,
  refetchIndividualDevices,
  resetIndividualDevices,
  showClosedDevices,
} from '.';
import { toArray } from '../../addIndividualDevice/components/CheckFormValuesModal';

fetchIndividualDevicesFx.use(getIndividualDevices);

$individualDevices
  .on(fetchIndividualDevicesFx.doneData, (_, devices) => devices)
  .reset(resetIndividualDevices, IndividualDevicesGate.close);

guard({
  source: IndividualDevicesGate.state.map((elem) => elem),
  clock: IndividualDevicesGate.state,
  filter: (value) => toArray(value).some(Boolean),
  target: fetchIndividualDevicesFx,
});

sample({
  source: IndividualDevicesGate.state.map((elem) => elem),
  clock: refetchIndividualDevices,
  target: fetchIndividualDevicesFx,
});

$isShownClosedDevices
  .on(showClosedDevices, () => true)
  .reset(hideClosedDevices);
