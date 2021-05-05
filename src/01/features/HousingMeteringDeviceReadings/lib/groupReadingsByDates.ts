import {
  GetHousingMeteringDeviceReadingsResponse,
  HousingMeteringDeviceReadingsResponse,
} from '../../../../myApi';

const groupReadingsByDates = (
  readings: GetHousingMeteringDeviceReadingsResponse
): GroupedReadings | null => {
  if (readings.items === null) return null;

  const groupedReadings = readings.items.reduce((acc, current) => {
    if (typeof current.month !== 'string') return acc;
    if (!acc.hasOwnProperty(current.year)) {
      return {
        ...acc,
        [current.year]: {
          [current.month]: [current],
        },
      };
    }

    return {
      ...acc,
      [current.year]: {
        ...acc[current.year],
        [current.month]: acc[current.year].hasOwnProperty(current.month)
          ? [...acc[current.year][current.month], current]
          : [current],
      },
    };
  }, [] as GroupedReadings);
  return groupedReadings;
};

const formReadingsWithArrays = (yearObject: GroupedReadings | null) => {
  if (yearObject === null) return null;
  let readings = [];
  for (let [key, value] of Object.entries(yearObject)) {
    readings.push({ year: key, items: formMonthReadings(value) });
  }
  return readings;
};

const formMonthReadings = (monthObject: MonthReadings) => {
  let monthArray = [];
  for (let [key, value] of Object.entries(monthObject)) {
    monthArray.push({ month: key, items: value });
  }
  return monthArray;
};

export const prepareReadings = (
  readings: GetHousingMeteringDeviceReadingsResponse
) => {
  return formReadingsWithArrays(groupReadingsByDates(readings));
};

type GroupedReadings = {
  [key: number]: MonthReadings;
};

type MonthReadings = {
  [key: string]: HousingMeteringDeviceReadingsResponse[];
};
//
//
// [0, 1, 2, 3, 4].reduce(function(accumulator, currentValue, index, array) {
//   return {accumulator: {currentValue}} ;
// }, 10);
//
// {2021: {
//   май: []
// }}
