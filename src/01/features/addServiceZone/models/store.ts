import { createEvent, createStore, forward, Store } from 'effector';
import {
  sendServiceZoneButtonClicked,
  nameChanged,
  sendServiceZoneFx,
  addServiceZoneButtonClicked,
} from './events';

export const $addZoneInput: Store<string> = createStore('');

export const $isAddServiceModalShown = createStore(false);

$addZoneInput.on(nameChanged, (_, newInput) => {
  return newInput;
});

$isAddServiceModalShown.on(addServiceZoneButtonClicked, () => {
  debugger;
  return !$isAddServiceModalShown.getState();
});

// forward({
//   from: addServiceZoneButtonClicked.map((_) =>
//     $isAddServiceModalShown.getState()
//   ),
//   to: sendServiceZoneFx,
// });

forward({
  from: sendServiceZoneButtonClicked.map((_) => $addZoneInput.getState()),
  to: sendServiceZoneFx,
});
