import { createStore, forward, Store } from 'effector';
import {
  addServiceZoneButtonClicked,
  inputChanged,
  nameChanged,
  sendServiceZoneFx,
} from './events';

export const $input: Store<string> = createStore('');

$input.on(nameChanged, (_, newInput) => {
  debugger;
  return newInput;
});

forward({
  from: addServiceZoneButtonClicked.map((_) => $input.getState()),
  to: sendServiceZoneFx,
});
