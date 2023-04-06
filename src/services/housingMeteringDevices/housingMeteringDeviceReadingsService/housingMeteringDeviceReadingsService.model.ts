import { message } from 'antd';
import { createDomain, forward, sample } from 'effector';
import { createGate } from 'effector-react';
import moment from 'moment';
import {
  CreateHousingMeteringDeviceReadingsRequest,
  EResourceType,
  GetHousingMeteringDeviceReadingsResponse,
  HousingMeteringDeviceReadingsIncludingPlacementResponse,
} from 'myApi';
import { EffectFailDataAxiosError } from 'types';
import {
  createHousingMeteringDeviceReading,
  fetchHousingMeteringDeviceReadings,
} from './housingMeteringDeviceReadingsService.api';

const domain = createDomain('housingMeteringDeviceReadingsService');

const getHousingMeteringDeviceReadingsFx = domain.createEffect<
  number,
  GetHousingMeteringDeviceReadingsResponse
>(fetchHousingMeteringDeviceReadings);

const createReading =
  domain.createEvent<CreateHousingMeteringDeviceReadingsRequest>();
const createReadingFx = domain.createEffect<
  CreateHousingMeteringDeviceReadingsRequest,
  HousingMeteringDeviceReadingsIncludingPlacementResponse,
  EffectFailDataAxiosError
>(createHousingMeteringDeviceReading);

const clearStore = domain.createEvent();

const $readings = domain
  .createStore<HousingMeteringDeviceReadingsIncludingPlacementResponse[]>([])
  .on(getHousingMeteringDeviceReadingsFx.doneData, (_, response) =>
    (response.items || []).filter(
      (reading) => !reading.isArchived && !reading.isRemoved,
    ),
  )
  .reset(clearStore);

const setResource = domain.createEvent<EResourceType>();
const $isColdWater = domain
  .createStore(false)
  .on(setResource, (_, resource) => resource === EResourceType.ColdWaterSupply);

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

createReadingFx.failData.watch((error) =>
  message.error(error.response.data.error.Text),
);

createReadingFx.done.watch(({ params }) =>
  message.success(
    `Показание за ${moment(params.readingDate).format('MMMM YYYY')} сохранено!`,
  ),
);

export const housingMeteringDeviceReadingsService = {
  inputs: { createReading },
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
