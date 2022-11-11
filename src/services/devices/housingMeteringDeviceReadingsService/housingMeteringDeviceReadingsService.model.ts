import { createDomain, forward } from 'effector';
import { createGate } from 'effector-react';
import { EResourceType, GetHousingMeteringDeviceReadingsResponse } from 'myApi';
import { fetchHousingMeteringDeviceReadings } from './housingMeteringDeviceReadingsService.api';
import { PreparedMeteringDeviceReading } from './housingMeteringDeviceReadingsService.types';
import { groupWithEmptyReadings } from './housingMeteringDeviceReadingsService.utils';

const domain = createDomain('housingMeteringDeviceReadingsService');

const getHousingMeteringDeviceReadingsFx = domain.createEffect<
  number,
  GetHousingMeteringDeviceReadingsResponse
>(fetchHousingMeteringDeviceReadings);

const $readings = domain
  .createStore<PreparedMeteringDeviceReading[]>([])
  .on(getHousingMeteringDeviceReadingsFx.doneData, (_, response) =>
    groupWithEmptyReadings(response.items || [])
  );

const setResource = domain.createEvent<EResourceType>();
const $isColdWater = domain
  .createStore(false)
  .on(setResource, (_, resource) => resource === EResourceType.ColdWaterSupply);

const NodeIdGate = createGate<{ nodeId: number }>();
const NodeResourceGate = createGate<{ resource: EResourceType }>();

forward({
  from: NodeIdGate.state.map(({ nodeId }) => nodeId),
  to: getHousingMeteringDeviceReadingsFx,
});

forward({
  from: NodeResourceGate.state.map(({ resource }) => resource),
  to: setResource,
});

export const housingMeteringDeviceReadingsService = {
  inputs: {},
  outputs: {
    $readings,
    $isColdWater,
  },
  gates: {
    NodeIdGate,
    NodeResourceGate,
  },
};
