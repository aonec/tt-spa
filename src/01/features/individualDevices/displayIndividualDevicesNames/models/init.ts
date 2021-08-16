import { getIndividualDevicesModels } from './../../../../_api/meteringDevices';
import { forward } from 'effector';
import {
  fetchIndividualDevicesNames,
  IndividualDevicecModelsGate,
} from './index';
import { $individualDevicesNames } from '.';

fetchIndividualDevicesNames.use(getIndividualDevicesModels);

$individualDevicesNames.on(
  fetchIndividualDevicesNames.doneData,
  (_, value) => value
);

forward({
  from: IndividualDevicecModelsGate.state.map((value) => ({
    Text: value.model,
  })),
  to: fetchIndividualDevicesNames,
});
