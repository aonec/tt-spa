import { round } from 'lodash';
import { MeteringDeviceReadings } from './meteringDevicesListService.types';

export const calcSumOfReadings = (readingsList: MeteringDeviceReadings[]) => {
  const sumOfReadings = readingsList.reduce((sum, readings) => {
    const { previousExistingReading, currentReading } = readings;
    const nonResidentialRoomConsumption =
      currentReading?.nonResidentialRoomConsumption || 0;

    if (currentReading)
      return (
        sum +
        currentReading.value -
        previousExistingReading.value +
        nonResidentialRoomConsumption
      );
    return round(sum + nonResidentialRoomConsumption, 3);
  }, 0);
  return sumOfReadings;
};
