import { HousingMeteringDeviceReadingsIncludingPlacementResponse } from 'myApi';
import moment from 'moment';
import {
  NodeReadingsStatuses,
  PreparedNodeReadingsData,
} from './accountingNodesReadingsInputService.types';
import { PREVIOUS_READING_INDEX_LIMIT } from '../metersService/AccountingNodesReadingsService/AccountingNodesReadingsService.constants';
import { getArrayByCountRange } from '01/features/readings/accountingNodesReadings/components/Filter/Filter.utils';
import { MetersInputBlockStatus } from '../individualDeviceMetersInputService/view/MetersInputsBlock/MetersInputsBlock.types';

export const getPreparedNodeReadingsDictionary = (
  readings: HousingMeteringDeviceReadingsIncludingPlacementResponse[],
) =>
  readings.reduce((acc, elem) => {
    const dateFormat = 'YYYY-MM';

    const currentMonthDate = moment(
      moment().format(dateFormat),
      dateFormat,
    ).add(1, 'M');
    const readingMonthDate = moment(
      moment(elem.readingDate).format(dateFormat),
    );

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
  getArrayByCountRange(8, (index) => index - 2).reduce(
    (acc, elem) => ({ ...acc, [elem]: status }),
    {} as NodeReadingsStatuses,
  );
