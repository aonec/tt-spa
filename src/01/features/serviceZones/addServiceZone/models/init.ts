import { forward } from 'effector';
import {
  sendServiceZoneButtonClicked,
  nameChanged,
  sendServiceZoneFx,
  addServiceZoneButtonClicked,
  cancelOrCloseButtonClicked,
  $addZoneInput,
  $isAddServiceModalShown,
} from './index';
import { addServiceZone } from '../../../../_api/service_zones';

$addZoneInput.on(nameChanged, (_, newInput) => {
  return newInput;
});

export const inputChanged = nameChanged.prepend(
  (e: React.ChangeEvent<HTMLInputElement>) => e.target.value
);

$isAddServiceModalShown.on(
  [addServiceZoneButtonClicked, cancelOrCloseButtonClicked],
  () => {
    return !$isAddServiceModalShown.getState();
  }
);

sendServiceZoneFx.use(async (name: string) => addServiceZone(name));

$isAddServiceModalShown.on(
  sendServiceZoneFx.done,
  () => !$isAddServiceModalShown.getState()
);

$addZoneInput.reset(sendServiceZoneFx.done);

forward({
  from: sendServiceZoneButtonClicked.map((_) => $addZoneInput.getState()),
  to: sendServiceZoneFx,
});
