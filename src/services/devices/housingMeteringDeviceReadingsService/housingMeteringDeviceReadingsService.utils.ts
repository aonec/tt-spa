import _ from 'lodash';
import { HousingMeteringDeviceReadingsIncludingPlacementResponse } from 'myApi';
import { PreparedMeteringDeviceReadings } from './housingMeteringDeviceReadingsService.types';

export const groupReadings = (
  readings: HousingMeteringDeviceReadingsIncludingPlacementResponse[]
) => {
  const existingReadings = readings.filter(
    (reading) => !reading.isArchived && !reading.isRemoved
  );

  const testReading = { ...existingReadings[0], year: 2019, month: 'январь' };
  const testReading2 = { ...existingReadings[0], year: 2018, month: 'январь' };
  const testReading3 = { ...existingReadings[0], year: 2020, month: 'январь' };

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

    return [...acc, { year, readings: yearGroupedByMonth }];
  }, [] as PreparedMeteringDeviceReadings);

  return groupedByMonth;
};
