import { createEffect, createEvent, createStore } from 'effector';
import { message } from 'antd';
import { forward, sample } from 'effector';
import { createGate } from 'effector-react';
import dayjs from 'api/dayjs';
import {
  CreateHousingMeteringDeviceReadingsRequest,
  EResourceType,
  GetHousingMeteringDeviceReadingsResponse,
  HousingMeteringDeviceReadingsIncludingPlacementResponse,
} from 'api/types';
import { EffectFailDataAxiosError } from 'types';
import {
  createHousingMeteringDeviceReading,
  fetchHousingMeteringDeviceReadings,
} from './housingMeteringDeviceReadingsService.api';

const getHousingMeteringDeviceReadingsFx = createEffect<
  number,
  GetHousingMeteringDeviceReadingsResponse
>(fetchHousingMeteringDeviceReadings);

const createReading = createEvent<CreateHousingMeteringDeviceReadingsRequest>();
const createReadingFx = createEffect<
  CreateHousingMeteringDeviceReadingsRequest,
  HousingMeteringDeviceReadingsIncludingPlacementResponse,
  EffectFailDataAxiosError
>(createHousingMeteringDeviceReading);

const clearStore = createEvent();

const $readings = createStore<
  HousingMeteringDeviceReadingsIncludingPlacementResponse[]
>([])
  .on(getHousingMeteringDeviceReadingsFx.doneData, (_, response) =>
    (response.items || []).filter(
      (reading) => !reading.isArchived && !reading.isRemoved,
    ),
  )
  .reset(clearStore);

const setResource = createEvent<EResourceType>();
const $isColdWater = createStore(false).on(
  setResource,
  (_, resource) => resource === EResourceType.ColdWaterSupply,
);

const $isLoading = getHousingMeteringDeviceReadingsFx.pending;

const NodeIdGate = createGate<{ nodeId: number }>();
const NodeResourceGate = createGate<{ resource: EResourceType }>();

forward({
  from: NodeIdGate.open.map(({ nodeId }) => nodeId),
  to: getHousingMeteringDeviceReadingsFx,
});

forward({
  from: NodeResourceGate.state.map(({ resource }) => resource),
  to: setResource,
});

forward({
  from: createReading,
  to: createReadingFx,
});

sample({
  source: NodeIdGate.state.map(({ nodeId }) => nodeId),
  clock: createReadingFx.doneData,
  target: getHousingMeteringDeviceReadingsFx,
});

forward({
  from: NodeIdGate.close,
  to: clearStore,
});

const createReadingFailed = createReadingFx.failData;

createReadingFailed.watch((error) =>
  message.error(error.response.data.error.Text),
);

createReadingFx.done.watch(({ params }) =>
  message.success(
    `Показание за ${dayjs(params.readingDate).format('MMMM YYYY')} сохранено!`,
  ),
);

export const housingMeteringDeviceReadingsService = {
  inputs: { createReading, createReadingFailed },
  outputs: {
    $readings,
    $isColdWater,
    $isLoading,
  },
  gates: {
    NodeIdGate,
    NodeResourceGate,
  },
};
