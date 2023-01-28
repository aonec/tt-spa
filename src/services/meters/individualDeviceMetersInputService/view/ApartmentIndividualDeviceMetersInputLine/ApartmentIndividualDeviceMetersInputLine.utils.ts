import { IndividualDeviceReadingsResponse } from 'myApi';
import { getReadingLite } from '../../individualDeviceMetersInputService.utils';

export function getReadingValuesArray(
  reading: IndividualDeviceReadingsResponse,
  rateNum: number
) {
  const readingLite = getReadingLite(reading, rateNum);

  return Object.values(readingLite);
}
