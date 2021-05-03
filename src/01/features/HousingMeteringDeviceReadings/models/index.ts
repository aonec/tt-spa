import { createEffect, createEvent, createStore } from 'effector';
import {
  CreateHousingMeteringDeviceReadingsRequest,
  GetHousingMeteringDeviceReadingsResponse,
  HousingMeteringDeviceReadingsResponse,
} from '../../../../myApi';
import { createGate } from 'effector-react';

export const $readings = createStore<GetHousingMeteringDeviceReadingsResponse>({
  items: null,
});

export const requestReadingsFx = createEffect<
  { nodeId: number },
  GetHousingMeteringDeviceReadingsResponse
>();

export const updateReadingsFx = createEffect<
  CreateHousingMeteringDeviceReadingsRequest,
  HousingMeteringDeviceReadingsResponse
>();

export const readingUpdated = createEvent<number>();

export const HousingMeteringDeviceReadingsGate = createGate();
