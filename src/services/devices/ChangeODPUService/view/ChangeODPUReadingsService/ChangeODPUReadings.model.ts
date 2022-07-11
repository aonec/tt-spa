import { createDomain, forward } from 'effector';
import { createGate } from 'effector-react';
import {
  GetHousingMeteringDeviceReadingsResponse,
  HousingMeteringDeviceReadingsIncludingPlacementResponse,
} from 'myApi';
import { fetchOldReadings } from './ChangeODPUReadings.api';

const domain = createDomain('ChangeODPUReadingsService');
const $oldReadings = domain.createStore<
  HousingMeteringDeviceReadingsIncludingPlacementResponse[] | null
>([]);

const getOldReadings = domain.createEffect<
  number,
  GetHousingMeteringDeviceReadingsResponse
>(fetchOldReadings);

$oldReadings.on(getOldReadings.doneData, (_, res) => res.items);

const OldDeviceNodeIdGate = createGate<{ nodeId: number }>();

forward({
  from: OldDeviceNodeIdGate.state.map(({ nodeId }) => nodeId),
  to: getOldReadings,
});

export const ChangeODPUReadingsService = {
  outputs: {
    $oldReadings,
  },
  gates: {
    OldDeviceNodeIdGate,
  },
};
