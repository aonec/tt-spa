import { createEffect, createEvent, createStore } from 'effector';
import { message } from 'antd';
import { sample } from 'effector';
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

const $nodeId = NodeIdGate.open.map(({ nodeId }) => nodeId || null);
const $nodeResource = NodeResourceGate.state.map(
  ({ resource }) => resource || null,
);

sample({
  source: $nodeId,
  clock: NodeIdGate.open,
  filter: Boolean,
  target: getHousingMeteringDeviceReadingsFx,
});

sample({
  clock: $nodeResource,
  filter: Boolean,
  target: setResource,
});

sample({
  clock: createReading,
  target: createReadingFx,
});

sample({
  source: $nodeId,
  filter: Boolean,
  clock: createReadingFx.doneData,
  target: getHousingMeteringDeviceReadingsFx,
});

sample({
  clock: NodeIdGate.close,
  target: clearStore,
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
