import {
  createEffect,
  createEvent,
  createStore,
  Effect,
  Store,
} from 'effector';
import { addServiceZone } from '../../../../_api/service_zones';
import { NodeServiceZoneResponse } from '../../../../../myApi';

export const cancelOrCloseButtonClicked = createEvent();

export const okButtonClicked = createEvent();

export const addServiceZoneButtonClicked = createEvent();

export const nameChanged = createEvent();

export const sendServiceZoneButtonClicked = createEvent();

export const sendServiceZoneFx: Effect<
  string,
  NodeServiceZoneResponse
> = createEffect();

export const $addZoneInput: Store<string> = createStore('');

export const $isAddServiceModalShown = createStore(false);
