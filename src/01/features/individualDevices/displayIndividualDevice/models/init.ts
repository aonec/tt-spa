import {
  IndividualDeviceGate,
  fetchIndividualDeviceFx,
  $individualDevice,
} from './index';
import { forward } from 'effector';
import { getIndividualDevice } from '01/_api/individualDevices';

fetchIndividualDeviceFx.use(getIndividualDevice);

$individualDevice
  .on(fetchIndividualDeviceFx.doneData, (_, device) => device)
  .reset(IndividualDeviceGate.close);

forward({
  from: IndividualDeviceGate.open.map((state) => state.id),
  to: fetchIndividualDeviceFx,
});
