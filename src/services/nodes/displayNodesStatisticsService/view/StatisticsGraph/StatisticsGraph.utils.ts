import moment from 'moment';
import { DateTimeTaskStatisticsItemArrayDictionaryItem } from 'api/types';
import {
  GetTaskXPosPayload,
  ReportType,
  PreparedArchiveValues,
} from './StatisticsGraph.types';
import {
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  format,
} from 'date-fns';

export function prepareDataForNodeStatistic(
  unsortedData: PreparedArchiveValues[],
  reportType: ReportType,
  withFault: boolean,
) {
  const data = sortArchiveArray(unsortedData);

  const minTime = data[0].timeUtc;
  const maxTime = data[data.length - 1].timeUtc;

  let elemsCount = 0;

  if (reportType === 'daily') {
    elemsCount = differenceInDays(new Date(maxTime), new Date(minTime));
  } else if (reportType === 'hourly') {
    elemsCount = differenceInHours(new Date(maxTime), new Date(minTime));
  }

  const result = [];

  for (let iterator = 0, index = 0; iterator < elemsCount; iterator++) {
    let elem = {
      ...data[index],
      timeUtc: moment(data[index].timeUtc).format(),
    };

    if (elem.hasFault && !withFault) {
      elem.value = 0;
    }

    let diff = 0;

    if (reportType === 'daily') {
      diff = differenceInDays(new Date(elem.timeUtc), new Date(minTime));
    } else if (reportType === 'hourly') {
      diff = differenceInHours(new Date(elem.timeUtc), new Date(minTime));
    }

    if (diff === iterator) {
      result.push(elem);
      index++;
    } else {
      result.push({
        timeUtc: moment(minTime).utcOffset(0).add(iterator, 'hours').format(),
        value: 0,
      });
    }
  }
  return result;
}

const getTaskXPos = (payload: GetTaskXPosPayload) => {
  let { currentData, minDate, maxDate, reportType } = payload;
  if (!currentData) {
    return null;
  }

  let diff = 0;
  if (reportType === 'hourly') {
    diff = differenceInHours(new Date(currentData), new Date(maxDate));
  } else {
    diff = differenceInDays(new Date(currentData), new Date(maxDate));
  }

  if (diff > 0) {
    return null;
  }
  if (reportType === 'hourly') {
    return (
      Math.round(
        differenceInMinutes(new Date(currentData), new Date(minDate)) / 60,
      ) -
      new Date().getTimezoneOffset() / 60 +
      1
    );
  }
  return (
    moment(currentData).utc(true).diff(moment(minDate).startOf('day'), 'day') +
    1
  );
};

export const getPreparedTaskData = ({
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

export const formatDate = (timeStamp: string): Date => {
  const dateObject = new Date(timeStamp);

  return dateObject;
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

export function sortArchiveArray<T>(archiveArr: (PreparedArchiveValues & T)[]) {
  const sortedArchive = archiveArr.sort((first, second) => {
    const firstDate = moment(first.timeUtc);
    const secondDate = moment(second.timeUtc);
    return firstDate.diff(secondDate);
  });

  return sortedArchive;
}

const formHourlyTicks = (
  archiveArr: PreparedArchiveValues[],
): PreparedArchiveValues[] => {
  if (archiveArr.length <= 24) return archiveArr;

  const sortedArchive = sortArchiveArray(archiveArr);

  return [
    sortedArchive[0],
    ...sortedArchive.filter((entry) => isHourMultiplySix(entry.timeUtc)),
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
    isDayMultiplyFive(entry.timeUtc),
  );
  const delta1 =
    getDayFromTimeStamp(multipleFives[0].timeUtc) -
    getDayFromTimeStamp(sortedArchive[0].timeUtc);
  const delta2 =
    getDayFromTimeStamp(sortedArchive[length - 1].timeUtc) -
    getDayFromTimeStamp(multipleFives[multipleFives.length - 1].timeUtc);
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
