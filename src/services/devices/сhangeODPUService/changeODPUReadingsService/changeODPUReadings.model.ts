import { createDomain, forward } from 'effector';
import { createGate } from 'effector-react';
import { GetHousingMeteringDeviceReadingsResponse } from 'myApi';
import { fetchOldReadings } from './changeODPUReadings.api';
import { prepareData } from './changeODPUReadings.utils';
import { PreparedHousingMeteringDeviceReadings } from './changeODPUReadingsService.types';

const domain = createDomain('ChangeODPUReadingsService');
const $oldReadings = domain.createStore<
  PreparedHousingMeteringDeviceReadings[]
>([]);

const $newDeviceInitialReadings = $oldReadings.map((readings) =>
  readings.map((elem) => ({
    readingDate: elem.readingDate,
    id: elem.id,
    text: elem.text,
    value: null,
    nonResidentialRoomConsumption: null,
  }))
);

const getOldReadings = domain.createEffect<
  number,
  GetHousingMeteringDeviceReadingsResponse
>(fetchOldReadings);

$oldReadings.on(getOldReadings.doneData, (_, res) => prepareData(res.items!));

const $loading = getOldReadings.pending;

const OldDeviceNodeIdGate = createGate<{ nodeId: number }>();

forward({
  from: OldDeviceNodeIdGate.open.map(({ nodeId }) => nodeId),
  to: getOldReadings,
});

export const ChangeODPUReadingsService = {
  outputs: {
    $oldReadings,
    $loading,
    $newDeviceInitialReadings,
  },
  gates: {
    OldDeviceNodeIdGate,
  },
};
