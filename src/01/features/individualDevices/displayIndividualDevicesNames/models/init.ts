import { getIndividualDevicesModels } from './../../../../_api/meteringDevices';
import { guard } from 'effector';
import {
  fetchIndividualDeviceNamesFx,
  IndividualDevicecModelsGate,
} from './index';
import { $individualDevicesNames } from '.';

fetchIndividualDeviceNamesFx.use(getIndividualDevicesModels);

$individualDevicesNames.on(
  fetchIndividualDeviceNamesFx.doneData,
  (_, value) => value
);

guard({
  clock: IndividualDevicecModelsGate.state.map((value) => ({
    Text: value.model,
  })),
  filter: ({ Text }) => Boolean(Text),
  target: fetchIndividualDeviceNamesFx,
});
