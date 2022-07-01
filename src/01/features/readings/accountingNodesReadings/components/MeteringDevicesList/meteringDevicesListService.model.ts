import { createDomain, forward } from 'effector';
import { createGate } from 'effector-react';
import { round } from 'lodash';
import {
  MeteringDeviceReadings,
  UpdateNodeReadingsPayload,
} from './meteringDevicesListService.types';

const domain = createDomain('meteringDeviceReadingsService');

const $readingsList = domain.createStore<MeteringDeviceReadings>({});
const $sumOfReadings = $readingsList.map((readings) =>
  Object.values(readings).reduce((sum, currentReadings) => {
    const { previousExistingReading, currentReading } = currentReadings;
    const nonResidentialRoomConsumption =
      currentReading?.nonResidentialRoomConsumption || 0;

    if (currentReading)
      return round(
        sum +
          currentReading.value -
          previousExistingReading.value +
          nonResidentialRoomConsumption,
        3
      );
    return round(sum + nonResidentialRoomConsumption, 3);
  }, 0)
);
const updateNodeReadings = domain.createEvent<UpdateNodeReadingsPayload>();
const clearReadingsList = domain.createEvent();

$readingsList
  .on(updateNodeReadings, (readingsList, newReadings) => {
    readingsList[newReadings.id] = newReadings.value;
    return { ...readingsList };
  })
  .reset(clearReadingsList);

const MeteringDevicesListIsOpen = createGate();

forward({
  from: MeteringDevicesListIsOpen.close,
  to: clearReadingsList,
});

export const meteringDeviceReadingsService = {
  outputs: {
    $readingsList,
    $sumOfReadings,
  },
  inputs: {
    updateNodeReadings,
  },
  gates: { MeteringDevicesListIsOpen },
};
