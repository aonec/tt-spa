import moment from 'moment';
import { DateTimeTaskStatisticsItemArrayDictionaryItem } from 'myApi';
import {
  GetTaskXPosPayload,
  ReportType,
  PreparedArchiveValues,
} from './StatisticsGraph.types';
import { differenceInDays, differenceInHours, format } from 'date-fns';

export function prepareDataForNodeStatistic(
  unsortedData: PreparedArchiveValues[],
  reportType: ReportType,
) {
  const data = sortArchiveArray(unsortedData);

  const minTime = data[0].time;
  const maxTime = data[data.length - 1].time;

  let elemsCount = 0;

  if (reportType === 'daily') {
    elemsCount = differenceInDays(new Date(maxTime), new Date(minTime));
  } else if (reportType === 'hourly') {
    elemsCount = differenceInHours(new Date(maxTime), new Date(minTime));
  }

  const result = [];

  for (let iterator = 0, index = 0; iterator < elemsCount; iterator++) {
    const elem = data[index];
    let diff = 0;

    if (reportType === 'daily') {
      diff = differenceInDays(new Date(elem.time), new Date(minTime));
    } else if (reportType === 'hourly') {
      diff = differenceInHours(new Date(elem.time), new Date(minTime));
    }

    if (diff === iterator) {
      result.push(elem);
      index++;
    } else {
      result.push({
        time: moment(minTime).add(iterator, 'hours').format(),
        value: 0,
      });
    }
  }
  return result;
}

const getTaskXPos = (payload: GetTaskXPosPayload) => {
  let { currentData, minDate, maxDate, reportType } = payload;
  const minDataMoment = moment(minDate).utcOffset(0).startOf('d');
  const maxDataMoment = moment(maxDate).utcOffset(0, false);

  let diff = 0;
  if (reportType === 'hourly') {
    diff = moment(currentData).utc(true).diff(maxDataMoment, 'h');
  } else {
    diff = moment(currentData).utc(true).diff(maxDataMoment, 'd');
  }

  if (!currentData || diff > 0) {
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
  minDate,
  maxDate,
  reportType,
}: {
  tasksByDate: DateTimeTaskStatisticsItemArrayDictionaryItem;
  reportType: ReportType;
  maxValue: number;
  minDate: string;
  maxDate: string;
}) => {
  const tasksArr = tasksByDate.value || [];
  const isAlone = tasksArr.length === 1;

  return {
    x: getTaskXPos({
      currentData: isAlone ? tasksArr[0]?.creationTime : tasksByDate?.key,
      minDate,
      maxDate,
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

const getHourFromTimeStamp = (timeStamp: string): number => {
  const date = new Date(timeStamp);
  return +format(date, 'HH');
};

const isHourMultiplySix = (timeStamp: string): boolean => {
  const hour = getHourFromTimeStamp(timeStamp);
  return hour % 6 === 0;
};

const getDayFromTimeStamp = (timeStamp: string): number => {
  const date = new Date(timeStamp);
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
    sortedArchive[0],
    ...sortedArchive.filter((entry) => isHourMultiplySix(entry.time)),
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
    return format(new Date(x), 'dd.MM');
  }
  if (archiveArrLength <= 24) {
    return format(new Date(x), 'HH');
  }

  if (archiveArrLength >= 97) {
    return format(new Date(x), 'H');
  }

  return format(new Date(x), 'HH:mm');
};
