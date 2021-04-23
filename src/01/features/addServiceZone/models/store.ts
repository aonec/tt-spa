import { createEvent, createStore, forward, Store } from 'effector';
import {
  sendServiceZoneButtonClicked,
  nameChanged,
  sendServiceZoneFx,
  addServiceZoneButtonClicked,
  cancelOrCloseButtonClicked,
} from './events';

export const $addZoneInput: Store<string> = createStore('');

export const $isAddServiceModalShown = createStore(false);

$addZoneInput.on(nameChanged, (_, newInput) => {
  return newInput;
});

$isAddServiceModalShown.on(
  [addServiceZoneButtonClicked, cancelOrCloseButtonClicked],
  () => {
    return !$isAddServiceModalShown.getState();
  }
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
