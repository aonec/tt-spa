import { createEffect, createEvent, createStore } from 'effector';
import {
  CreateHousingMeteringDeviceReadingsRequest,
  GetHousingMeteringDeviceReadingsResponse,
  HousingMeteringDeviceReadingsResponse,
  UpdateHousingMeteringDeviceReadingsRequest,
} from '../../../../myApi';
import { createGate } from 'effector-react';

export const $readings = createStore<GetHousingMeteringDeviceReadingsResponse>({
  items: null,
});

export const requestReadingsFx = createEffect<
  { nodeId: number },
  GetHousingMeteringDeviceReadingsResponse
>();

export const postReadingFx = createEffect<
  CreateHousingMeteringDeviceReadingsRequest,
  HousingMeteringDeviceReadingsResponse
>();

export const updateReadingFx = createEffect<
  UpdateHousingMeteringDeviceReadingsRequest,
  HousingMeteringDeviceReadingsResponse
>();

export const readingUpdated = createEvent<number>();

export const HousingMeteringDeviceReadingsGate = createGate<{
  nodeId: number;
}>();
