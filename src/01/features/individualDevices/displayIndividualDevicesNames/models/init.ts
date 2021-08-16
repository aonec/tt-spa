import { getIndividualDevicesModels } from './../../../../_api/meteringDevices';
import { guard } from 'effector';
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

guard({
  clock: IndividualDevicecModelsGate.state.map((value) => ({
    Text: value.model,
  })),
  filter: ({ Text }) => Boolean(Text),
  target: fetchIndividualDevicesNames,
});
