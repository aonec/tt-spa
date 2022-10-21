import { format } from 'date-fns';
import {
  PreparedArchiveValues,
  ReportType,
} from './components/GraphView/GraphView.types';
import moment from 'moment';

export const formatDate = (timeStamp: string): Date => {
  const dateObject = new Date(timeStamp);
  const millisecondsInHour = 60 * 1000;
  const date = new Date(
    dateObject.valueOf() + dateObject.getTimezoneOffset() * millisecondsInHour
  );
  return date;
};

const getHourFromTimeStamp = (timeStamp: string): number => {
  const date = formatDate(timeStamp);
  return +format(date, 'HH');
};

const isHourMultiplySix = (timeStamp: string): boolean => {
  const hour = getHourFromTimeStamp(timeStamp);
  return hour % 6 === 0;
};

const getDayFromTimeStamp = (timeStamp: string): number => {
  const date = formatDate(timeStamp);
  return +format(date, 'dd');
};

const isDayMultiplyFive = (timeStamp: string): boolean => {
  const day = getDayFromTimeStamp(timeStamp);
  return day % 5 === 0;
};

export const sortArchiveArray = (archiveArr: PreparedArchiveValues[]) => {
  const sortedArchive = archiveArr.sort((first, second) => {
    const firstDate = moment(first.time);
    const secondDate = moment(second.time);
    return firstDate.diff(secondDate);
  });

  return sortedArchive;
};

const formHourlyTicks = (
  archiveArr: PreparedArchiveValues[]
): PreparedArchiveValues[] => {
  if (archiveArr.length <= 24) return archiveArr;

  const sortedArchive = sortArchiveArray(archiveArr);

  return [
    ...sortedArchive.filter((entry) => isHourMultiplySix(entry.time)),
    sortedArchive[sortedArchive.length - 1],
  ];
};

const formDailyTicks = (
  archiveArr: PreparedArchiveValues[]
): PreparedArchiveValues[] => {
  if (archiveArr.length <= 14) return archiveArr;
  const sortedArchive = sortArchiveArray(archiveArr);

  const length = sortedArchive.length;
  const multipleFives = sortedArchive.filter((entry) =>
    isDayMultiplyFive(entry.time)
  );
  const delta1 =
    getDayFromTimeStamp(multipleFives[0].time) -
    getDayFromTimeStamp(sortedArchive[0].time);
  const delta2 =
    getDayFromTimeStamp(sortedArchive[length - 1].time) -
    getDayFromTimeStamp(multipleFives[multipleFives.length - 1].time);
  const sliceParam1 = delta1 < 2 ? 1 : 0;
  const sliceParam2 =
    delta2 < 2 ? multipleFives.length - 1 : multipleFives.length;

  return [
    sortedArchive[0],
    ...multipleFives.slice(sliceParam1, sliceParam2),
    sortedArchive[length - 1],
  ];
};

export const formTicks = (
  archiveArr: PreparedArchiveValues[],
  reportType: ReportType
): PreparedArchiveValues[] => {
  switch (reportType) {
    case 'hourly':
      return formHourlyTicks(archiveArr);
    case 'daily':
      return formDailyTicks(archiveArr);
    default:
      throw new Error('Неправильный тип!');
  }
};

export const getTickFormat = (
  archiveArrLength: number,
  reportType: ReportType,
  x: string
) => {
  if (reportType === 'daily') {
    return format(formatDate(x), 'dd.MM');
  }
  if (archiveArrLength <= 24) {
    return format(formatDate(x), 'HH');
  }

  if (archiveArrLength >= 97) {
    return format(formatDate(x), 'H');
  }

  return format(formatDate(x), 'HH:mm');
};
