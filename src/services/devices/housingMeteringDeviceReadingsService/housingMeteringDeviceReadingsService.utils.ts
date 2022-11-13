import _ from 'lodash';
import moment from 'moment';
import {
  EMagistralType,
  HousingMeteringDeviceReadingsIncludingPlacementResponse,
} from 'myApi';
import { getFilledArray } from 'utils/getFilledArray';
import { MeteringDeviceReadingWithEmpties } from './housingMeteringDeviceReadingsService.types';

export const groupWithEmptyReadings = (
  allReadings: HousingMeteringDeviceReadingsIncludingPlacementResponse[]
) => {
  const existingReadings = allReadings.filter(
    (reading) => !reading.isArchived && !reading.isRemoved
  );

  const sortedReadingsDictionary = _.groupBy(
    existingReadings,
    (reading) => `${reading.year} ${reading.month}`
  );
  const sortedReadingsDates = Object.keys(
    sortedReadingsDictionary
  ).sort((first, second) =>
    moment(first, 'YYYY MMMM').diff(moment(second, 'YYYY MMMM'), 'month')
  );

  const [feedFlowId, feedBackFlowId] = getDeviceIds(existingReadings);

  const firstReadingDate = sortedReadingsDates[0];

  if (!firstReadingDate || !feedFlowId) {
    return [];
  }

  const diff = moment(firstReadingDate, 'YYYY MMMM').diff(moment(), 'month');

  const readingsWithEmpty = getFilledArray(Math.abs(diff) + 1, (index) => {
    const year = moment()
      .add(diff + index, 'month')
      .format('YYYY');
    const month = moment()
      .add(diff + index, 'month')
      .format('MMMM');
    const date = `${year} ${month}`;

    let readings: MeteringDeviceReadingWithEmpties[] | undefined =
      sortedReadingsDictionary[date];

    if (!readings) {
      readings = [
        {
          value: null,
          deviceId: feedFlowId,
          year,
          month,
        },
      ];

      if (feedBackFlowId) {
        readings = [
          ...readings,
          {
            value: null,
            deviceId: feedBackFlowId,
            year,
            month,
          },
        ];
      }
    }

    return readings;
  });

  const groupedReadings = groupReadings(readingsWithEmpty);

  return groupedReadings;
};

const groupReadings = (
  readings: {
    value: number | null;
    deviceId: number;
    year: string | number;
    month: string | null;
  }[][]
) => {
  const groupedReadingsByYear = _.groupBy(
    readings,
    (readings) => readings[0]?.year
  );

  const groupedReadingsByMonth = Object.entries(groupedReadingsByYear).map(
    ([year, yearReadings]) => {
      const flattenByYear = yearReadings.flat();

      const groupedbyMonth = _.groupBy(
        flattenByYear,
        (readings) => readings?.month
      );

      const formatedByMonth = Object.entries(groupedbyMonth).map(
        ([month, readings]) => ({
          month,
          readings,
        })
      );
      return { year, readings: _.reverse(formatedByMonth) };
    }
  );

  return _.reverse(groupedReadingsByMonth);
};

const getDeviceIds = (
  readings: HousingMeteringDeviceReadingsIncludingPlacementResponse[]
) => {
  const feedFlowReading =
    readings.find(
      (reading) => reading.magistralType === EMagistralType.FeedFlow
    ) || null;

  const feedBackFlowReading =
    readings.find(
      (reading) => reading.magistralType === EMagistralType.FeedBackFlow
    ) || null;

  return [feedFlowReading?.deviceId, feedBackFlowReading?.deviceId];
};
