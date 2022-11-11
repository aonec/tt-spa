import _ from 'lodash';
import moment from 'moment';
import {
  EMagistralType,
  HousingMeteringDeviceReadingsIncludingPlacementResponse,
} from 'myApi';
import { getFilledArray } from 'utils/getFilledArray';

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

export const groupWithEmptyReadings = (
  allReadings: HousingMeteringDeviceReadingsIncludingPlacementResponse[]
) => {
  const existingReadings = allReadings.filter(
    (reading) => !reading.isArchived && !reading.isRemoved
  );

  const testReading = { ...existingReadings[0], year: 2020, month: 'апрель' };

  const testReadings = [...existingReadings, testReading];

  const sortedReadingsDictionary = _.groupBy(
    testReadings,
    (reading) => `${reading.year} ${reading.month}`
  );
  const sortedReadings = Object.keys(
    sortedReadingsDictionary
  ).sort((first, second) =>
    moment(first, 'YYYY MMMM').diff(moment(second, 'YYYY MMMM'), 'month')
  );

  const [feedFlowId, feedBackFlowId] = getDeviceIds(existingReadings);

  const firstReadingDate = sortedReadings[0];

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

    const readings = sortedReadingsDictionary[date];
    if (!readings) {
      let result = [{ value: 0, deviceId: feedFlowId, year, month }];
      if (feedBackFlowId) {
        result = [
          ...result,
          { value: 0, deviceId: feedBackFlowId, year, month },
        ];
      }
      return result;
    }

    return readings;
  });

  const groupedReadingsByYear = _.groupBy(
    readingsWithEmpty,
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
