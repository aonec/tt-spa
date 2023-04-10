import moment from 'moment';
import { DateTimeTaskStatisticsItemArrayDictionaryItem } from 'myApi';
import {
  GetTaskXPosPayload,
  ReportType,
  PreparedArchiveValues,
} from './StatisticsGraph.types';
import { format } from 'date-fns';

const getTaskXPos = (payload: GetTaskXPosPayload) => {
  const { currentData, minData, reportType } = payload;

  const minDataMoment = moment(minData).utcOffset(0).startOf('d');

  if (!currentData) {
    return null;
  }
  if (reportType === 'hourly') {
    return moment(currentData).utc(true).diff(minDataMoment, 'h') + 1;
  }

  return moment(currentData).utc(true).diff(minDataMoment, 'd') + 1;
};

export const getPreparedData = ({
  tasksByDate,
  maxValue,
  minData,
  reportType,
}: {
  tasksByDate: DateTimeTaskStatisticsItemArrayDictionaryItem;
  reportType: ReportType;
  maxValue: number;
  minData: string;
}) => {
  const tasksArr = tasksByDate.value || [];

  return {
    x: getTaskXPos({
      currentData: tasksByDate?.key,
      minData,
      reportType,
    }),
    y: maxValue * 0.9,
    amount: tasksArr.length,
    isEmergency: tasksArr.filter((elem) => elem.isEmergency).length !== 0,
    isAllActive: tasksArr.filter((elem) => elem.isClosed).length === 0,
    tasksInfo: tasksArr.map((task) => ({
      id: task.id,
      title: task.creationReason,
    })),
  };
};

export const formatDate = (timeStamp: string): Date => {
  const dateObject = new Date(timeStamp);
  const millisecondsInHour = 60 * 1000;
  const date = new Date(
    dateObject.valueOf() + dateObject.getTimezoneOffset() * millisecondsInHour,
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
  archiveArr: PreparedArchiveValues[],
): PreparedArchiveValues[] => {
  if (archiveArr.length <= 24) return archiveArr;

  const sortedArchive = sortArchiveArray(archiveArr);

  return [
    ...sortedArchive.filter((entry) => isHourMultiplySix(entry.time)),
    sortedArchive[sortedArchive.length - 1],
  ];
};

const formDailyTicks = (
  archiveArr: PreparedArchiveValues[],
): PreparedArchiveValues[] => {
  if (archiveArr.length <= 14) return archiveArr;
  const sortedArchive = sortArchiveArray(archiveArr);

  const length = sortedArchive.length;
  const multipleFives = sortedArchive.filter((entry) =>
    isDayMultiplyFive(entry.time),
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
  reportType: ReportType,
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
  x: string,
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