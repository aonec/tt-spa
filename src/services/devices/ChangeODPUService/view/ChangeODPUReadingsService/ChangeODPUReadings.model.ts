import { createDomain, forward } from 'effector';
import { createGate } from 'effector-react';
import { GetHousingMeteringDeviceReadingsResponse } from 'myApi';
import { fetchOldReadings } from './ChangeODPUReadings.api';
import { prepareData } from './ChangeODPUReadings.utils';
import { PreparedHousingMeteringDeviceReadings } from './ChangeODPUReadingsService.types';

const domain = createDomain('ChangeODPUReadingsService');
const $oldReadings = domain.createStore<
  PreparedHousingMeteringDeviceReadings[]
>([]);

const getOldReadings = domain.createEffect<
  number,
  GetHousingMeteringDeviceReadingsResponse
>(fetchOldReadings);

$oldReadings.on(getOldReadings.doneData, (_, res) => prepareData(res.items!));

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
