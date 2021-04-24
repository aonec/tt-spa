import {
  createEffect,
  createEvent,
  createStore,
  Effect,
  Store,
} from 'effector';
import { addServiceZone } from '../../../../_api/service_zones';
import {
  NodeServiceZoneListResponse,
  NodeServiceZoneResponse,
} from '../../../../../myApi';
import { createGate } from 'effector-react';

export const PageGate = createGate();

export const $serviceZones: Store<string> = createStore('');
