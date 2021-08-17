import {
  IndividualDeviceGate,
  fetchIndividualDevice,
  $individualDevice,
} from './index';
import { forward } from 'effector';
import { getIndividualDevice } from '01/_api/apiRequests';

fetchIndividualDevice.use(getIndividualDevice);

$individualDevice.on(fetchIndividualDevice.doneData, (_, device) => device);

forward({
  from: IndividualDeviceGate.open.map((state) => state.id),
  to: fetchIndividualDevice,
});
