import { createEffect, createStore, restore } from 'effector';

import { createGate } from 'effector-react';
import { NodeServiceZoneListResponse } from '../../../../../myApi';

export const PageGate = createGate();

export const $serviceZones = createStore<{ id: number; name: string | null }[]>(
  []
);

export const requestServiceZonesFx = createEffect<
  void,
  NodeServiceZoneListResponse
>();

export const $requestServiceZonesStatus = createStore('init');
