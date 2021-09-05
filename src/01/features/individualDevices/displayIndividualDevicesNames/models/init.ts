import { getIndividualDevicesModels } from './../../../../_api/meteringDevices';
import { guard } from 'effector';
import {
  fetchIndividualDeviceFxsNames,
  IndividualDevicecModelsGate,
} from './index';
import { $individualDevicesNames } from '.';

fetchIndividualDeviceFxsNames.use(getIndividualDevicesModels);

$individualDevicesNames.on(
  fetchIndividualDeviceFxsNames.doneData,
  (_, value) => value
);

guard({
  clock: IndividualDevicecModelsGate.state.map((value) => ({
    Text: value.model,
  })),
  filter: ({ Text }) => Boolean(Text),
  target: fetchIndividualDeviceFxsNames,
});
