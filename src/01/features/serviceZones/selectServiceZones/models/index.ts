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
import _ from 'lodash';

export const PageGate = createGate();

export const $serviceZones = createStore<NodeServiceZoneResponse[]>([]);

export const setChosenInput = createEvent<number>();

export const $chosenInput: Store<NodeServiceZoneResponse> = createStore(
  {} as NodeServiceZoneResponse
);

export const $derivedChosenInput = $chosenInput.map((oldInput) => {
  return _.isEmpty(oldInput)
    ? null
    : {
        value: oldInput.id,
        label: oldInput.name,
      };
});

export const requestServiceZonesFx = createEffect<
  void,
  NodeServiceZoneListResponse
>();

export const $requestServiceZonesStatus = createStore('init');
