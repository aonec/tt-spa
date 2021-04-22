import { createEffect, createEvent, Effect, forward } from 'effector';
import { addServiceZone } from '../../../_api/service_zones';
import { NodeServiceZoneResponse } from '../../../../myApi';

export const addServiceZoneButtonClicked = createEvent();

export const nameChanged = createEvent();

export const sendServiceZoneButtonClicked = createEvent();

export const inputChanged = nameChanged.prepend((e: any) => e.target.value);

export const sendServiceZoneFx: Effect<
  string,
  NodeServiceZoneResponse
> = createEffect(async (name: string) => addServiceZone(name));
