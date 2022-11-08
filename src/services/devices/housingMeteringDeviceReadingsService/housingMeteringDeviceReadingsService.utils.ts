import _ from 'lodash';
import moment from 'moment';
import { HousingMeteringDeviceReadingsIncludingPlacementResponse } from 'myApi';
import { PreparedMeteringDeviceReadings } from './housingMeteringDeviceReadingsService.types';

export const groupReadings = (
  readings: HousingMeteringDeviceReadingsIncludingPlacementResponse[]
) => {
  const existingReadings = readings.filter(
    (reading) => !reading.isArchived && !reading.isRemoved
  );

  const testReading = { ...existingReadings[0], year: 2020, month: 'декабрь' };
  const testReading2 = { ...existingReadings[0], year: 2020, month: 'август' };
  const testReading3 = { ...existingReadings[0], year: 2020, month: 'апрель' };

  const testReadings = [
    ...existingReadings,
    testReading,
    testReading2,
    testReading3,
  ];

  const groupedByYear = _.groupBy(testReadings, 'year');
  const reversed = _.reverse(Object.entries(groupedByYear));

  const groupedByMonth = reversed.reduce((acc, [year, yearReading]) => {
    const yearGroupedByMonth = _.groupBy(yearReading, 'month');
    
    const yearSortedByMonth = Object.entries(yearGroupedByMonth)
      .sort(([firstMonth], [secondMonth]) =>
        moment(firstMonth, 'MMMM').diff(moment(secondMonth, 'MMMM'))
      )
      .map(([month, readings]) => ({ month, readings }));

    return [...acc, { year, readings: yearSortedByMonth }];
  }, [] as PreparedMeteringDeviceReadings);

  return groupedByMonth;
};
