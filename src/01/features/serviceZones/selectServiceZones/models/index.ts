import { createEffect, createStore } from 'effector';

import { createGate } from 'effector-react';
import { NodeServiceZoneListResponse } from '../../../../../myApi';

export const PageGate = createGate();

export const $serviceZones = createStore<{ id: number; name: string | null }[]>(
  [{ id: 0, name: '' }]
);

export const requestServiceZonesFx = createEffect<
  void,
  NodeServiceZoneListResponse
>();
