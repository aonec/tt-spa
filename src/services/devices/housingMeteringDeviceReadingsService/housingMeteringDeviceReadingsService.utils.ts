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
  const sortedReadingsDictionary = _.groupBy(
    allReadings,
    (reading) => `${reading.year} ${reading.month}`
  );
  const sortedReadingsDates = Object.keys(
    sortedReadingsDictionary
  ).sort((first, second) =>
    moment(first, 'YYYY MMMM').diff(moment(second, 'YYYY MMMM'), 'month')
  );

  const [feedFlowId, feedBackFlowId] = getDeviceIds(allReadings);

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
          previousReadingsId: null,
          magistralType: EMagistralType.FeedFlow,
          id: null,
          deviceId: feedFlowId,
          year,
          month,
        },
      ];
    }

    if (feedBackFlowId && readings.length === 1) {
      const isFeedBackFlowExist =
        readings[0].magistralType === EMagistralType.FeedBackFlow;

      const magistralType = isFeedBackFlowExist
        ? EMagistralType.FeedFlow
        : EMagistralType.FeedBackFlow;
      const deviceId = isFeedBackFlowExist ? feedFlowId : feedBackFlowId;

      readings = [
        ...readings,
        {
          value: null,
          magistralType,
          previousReadingsId: null,
          id: null,
          deviceId,
          year,
          month,
        },
      ];
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
    previousReadingsId: string | null;
    magistralType: EMagistralType;
    id: string | null;
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
