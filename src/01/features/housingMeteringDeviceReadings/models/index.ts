import { createEffect, createEvent, createStore } from 'effector';
import {
  GetHousingMeteringDeviceReadingsResponse,
  HousingMeteringDeviceReadingsResponse,
  EResourceType,
} from '../../../../myApi';
import { createGate } from 'effector-react';
import { prepareReadings } from '../lib/groupReadingsByDates';

export const $readings = createStore<GetHousingMeteringDeviceReadingsResponse>({
  items: null,
});

export const $readingsToDisplay = $readings.map(prepareReadings);

export const $latestSuccessReadings = createStore<GetHousingMeteringDeviceReadingsResponse>(
  {
    items: null,
  }
);

export const ResourceGate = createGate<{ resource: EResourceType | null }>();

export const $resource = createStore<{ resource: EResourceType | null }>({
  resource: null,
});

export const $isColdWaterSupply = $resource.map(
  ({ resource }) => resource === EResourceType.ColdWaterSupply
);

export const $chosenInputId = createStore<number | null>(null);

export const requestReadingsFx = createEffect<
  { nodeId: number },
  GetHousingMeteringDeviceReadingsResponse
>();

export const postReadingFx = createEffect<
  InputPayloadType,
  HousingMeteringDeviceReadingsResponse
>();

export type InputPayloadType = {
  deviceId: number;
  value: number;
  year: number;
  month: string | null;
  id?: string | null;
};

export const inputBlur = createEvent<InputPayloadType>();

export const $postReadingsErrorMessage = createStore<string | null>(null);

export const $requestReadingsErrorMessage = createStore<string | null>(null);

export const readingChanged = createEvent<InputPayloadType>();

export const HousingMeteringDeviceReadingsGate = createGate<{
  nodeId: number;
}>();
