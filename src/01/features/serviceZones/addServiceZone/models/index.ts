import {
  createEffect,
  createEvent,
  createStore,
  Effect,
  guard,
  Store,
} from 'effector';
import { NodeServiceZoneResponse } from '../../../../../myApi';

export const addServiceZoneButtonClicked = createEvent();

export const cancelButtonClicked = createEvent();

export const okButtonClicked = createEvent();

export const nameChanged = createEvent();

export const sendServiceZoneButtonClicked = createEvent();

export const sendServiceZoneFx: Effect<
  string,
  NodeServiceZoneResponse
> = createEffect();

export const $addZoneStatus = createStore('init');

export const $addZoneInput: Store<string> = createStore('');

//
// const target = guard(setChosenInput, {
//   filter: (x) => x > 0,
// });

export const $isAddServiceModalShown = createStore(false);
