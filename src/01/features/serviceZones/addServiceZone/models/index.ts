import {
  createEffect,
  createEvent,
  createStore,
  Effect,
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

// export const sendServiceZoneFx = createEffect();

export const $error = createStore<any>(null).on(
  sendServiceZoneFx.failData,
  (_, error) => error
);

export const $addZoneInput: Store<string> = createStore('');

export const $isAddServiceModalShown = createStore(false);
