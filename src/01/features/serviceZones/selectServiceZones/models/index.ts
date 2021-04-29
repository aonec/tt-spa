import {
  createEffect,
  createEvent,
  createStore,
  restore,
  Store,
} from 'effector';

import { createGate } from 'effector-react';
import {
  NodeServiceZoneListResponse,
  NodeServiceZoneResponse,
} from '../../../../../myApi';

export const PageGate = createGate();

export const $serviceZones = createStore<NodeServiceZoneResponse[]>([]);

export const setChosenInput = createEvent<number>();

export const $chosenInput: Store<NodeServiceZoneResponse> = createStore(
  {} as NodeServiceZoneResponse
);

export const $derivedChosenInput = $chosenInput.map((oldInput) => ({
  value: oldInput.id,
  label: oldInput.name,
}));

export const requestServiceZonesFx = createEffect<
  void,
  NodeServiceZoneListResponse
>();

export const $requestServiceZonesStatus = createStore('init');
