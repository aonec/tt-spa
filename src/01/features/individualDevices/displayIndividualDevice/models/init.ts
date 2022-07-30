import {
  IndividualDeviceGate,
  fetchIndividualDeviceFx,
  $individualDevice,
} from './index';
import { forward, guard } from 'effector';
import { getIndividualDevice } from '../../../../_api/individualDevices';

fetchIndividualDeviceFx.use(getIndividualDevice);

$individualDevice
  .on(fetchIndividualDeviceFx.doneData, (_, device) => device)
  .reset(IndividualDeviceGate.close);

forward({
  from: guard({
    clock: IndividualDeviceGate.open,
    source: IndividualDeviceGate.state.map((state) => state.id),
    filter: Boolean,
  }),
  to: fetchIndividualDeviceFx,
});
