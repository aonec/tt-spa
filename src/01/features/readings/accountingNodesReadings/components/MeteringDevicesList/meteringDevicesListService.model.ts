import { createDomain, forward } from 'effector';
import { createGate } from 'effector-react';
import { MeteringDeviceReadings } from './meteringDevicesListService.types';

const domain = createDomain('meteringDeviceReadingsService');

const $readingsList = domain.createStore<MeteringDeviceReadings[]>([]);
const addNodeReadings = domain.createEvent<MeteringDeviceReadings>();
const clearReadingsList = domain.createEvent();

$readingsList
  .on(addNodeReadings, (readingsList, newReadings) => {
    const existReadings = readingsList?.find(
      (elem) => elem.id === newReadings.id
    );
    if (!existReadings) return [...readingsList, newReadings];
    return readingsList?.map((readings) =>
      readings.id === newReadings.id ? newReadings : readings
    );
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
  },
  inputs: {
    addNodeReadings,
  },
  gates: { MeteringDevicesListIsOpen },
};
