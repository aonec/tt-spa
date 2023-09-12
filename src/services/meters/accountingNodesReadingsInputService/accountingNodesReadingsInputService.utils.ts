import { HousingMeteringDeviceReadingsIncludingPlacementResponse } from 'api/types';
import dayjs from 'api/dayjs';
import {
  NodeReadingsStatuses,
  PreparedNodeReadingsData,
} from './accountingNodesReadingsInputService.types';
import { PREVIOUS_READING_INDEX_LIMIT } from '../metersService/AccountingNodesReadingsService/AccountingNodesReadingsService.constants';
import { MetersInputBlockStatus } from '../individualDeviceMetersInputService/view/MetersInputsBlock/MetersInputsBlock.types';
import { getFilledArray } from 'utils/getFilledArray';

export const getPreparedNodeReadingsDictionary = (
  readings: HousingMeteringDeviceReadingsIncludingPlacementResponse[],
) =>
  readings.reduce((acc, elem) => {
    const dateFormat = 'YYYY-MM';

    const currentMonthDate = dayjs(dayjs().format(dateFormat), dateFormat).add(
      1,
      'M',
    );
    const readingMonthDate = dayjs(dayjs(elem.readingDate).format(dateFormat));

    if (
      elem.isArchived ||
      elem.isRemoved ||
      currentMonthDate.diff(readingMonthDate, 'months') > 11
    )
      return acc;

    const index = currentMonthDate.diff(readingMonthDate, 'months') - 1;

    acc[index] = elem;

    return acc;
  }, {} as PreparedNodeReadingsData);

export function getPreviousExistingReading(
  readings: PreparedNodeReadingsData,
  index: number,
) {
  const nextIndex = () => index++;

  nextIndex();

  while (index <= PREVIOUS_READING_INDEX_LIMIT) {
    const reading = readings[index];

    if (reading) return readings[index];

    nextIndex();
  }
}

export const getELectricNodeInputStatuses = (
  status: MetersInputBlockStatus | null,
) =>
  getFilledArray(8, (index) => index - 1).reduce(
    (acc, elem) => ({ ...acc, [elem]: status }),
    {} as NodeReadingsStatuses,
  );
