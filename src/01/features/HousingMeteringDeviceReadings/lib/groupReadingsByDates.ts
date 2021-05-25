import {
  GetHousingMeteringDeviceReadingsResponse,
  HousingMeteringDeviceReadingsResponse,
} from '../../../../myApi';

const groupReadingsByDates = (
  readings: GetHousingMeteringDeviceReadingsResponse
): GroupedReadingsByDates | null => {
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
  }, [] as GroupedReadingsByDates);
  return groupedReadings;
};

const formReadingsWithArrays = (
  yearObject: GroupedReadingsByDates | null
): YearReadingsType[] | null => {
  if (yearObject === null) return null;
  let readings = [];
  for (let [key, value] of Object.entries(yearObject)) {
    readings.push({ year: key, items: formMonthReadings(value) });
  }
  return readings;
};

const formMonthReadings = (monthObject: MonthReadings): MonthReadingsType[] => {
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

type GroupedReadingsByDates = {
  [key: number]: MonthReadings;
};

type MonthReadings = {
  [key: string]: HousingMeteringDeviceReadingsResponse[];
};

export type MonthReadingsType = {
  month: string;
  items: HousingMeteringDeviceReadingsResponse[];
};

export type YearReadingsType = {
  year: string;
  items: MonthReadingsType[];
};
