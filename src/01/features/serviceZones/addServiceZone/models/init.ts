import { forward } from 'effector';
import {
  sendServiceZoneButtonClicked,
  nameChanged,
  sendServiceZoneFx,
  addServiceZoneButtonClicked,
  cancelButtonClicked,
  $addZoneInput,
  $isAddServiceModalShown,
} from './index';
import { $serviceZones } from '../../selectServiceZones/models';
import { addServiceZone } from '../../../../_api/service_zones';

$addZoneInput.on(nameChanged, (_, newInput) => {
  return newInput;
});

export const inputChanged = nameChanged.prepend(
  (e: React.ChangeEvent<HTMLInputElement>) => e.target.value
);

$isAddServiceModalShown.on(
  [addServiceZoneButtonClicked, cancelButtonClicked],
  () => {
    return !$isAddServiceModalShown.getState();
  }
);

sendServiceZoneFx.use(
  // async (serviceZoneName: string) => Promise.reject(serviceZoneName)
  async (serviceZoneName: string) => addServiceZone(serviceZoneName)
);

$isAddServiceModalShown.on(
  sendServiceZoneFx.done,
  () => !$isAddServiceModalShown.getState()
);

$addZoneInput.reset(sendServiceZoneFx.done);

forward({
  from: sendServiceZoneButtonClicked.map((_) => $addZoneInput.getState()),
  to: sendServiceZoneFx,
});

$serviceZones.on(sendServiceZoneFx.doneData, (s, a) => {
  return [...s, a];
});
