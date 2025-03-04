import dayjs from 'api/dayjs';
import { TaskStatisticsItem } from 'api/types';
import {
  GetTaskXPosPayload,
  ReportType,
  PreparedArchiveValues,
} from './StatisticsGraph.types';

export function prepareDataForNodeStatistic(
  unsortedData: PreparedArchiveValues[],
  reportType: ReportType,
  withFault: boolean,
) {
  const data = sortArchiveArray(unsortedData);

  const minTimeDayJs = dayjs(data[0].time).utcOffset(0);
  const maxTime = data[data.length - 1].time;

  let elemsCount = 0;

  if (reportType === 'daily') {
    elemsCount = dayjs(maxTime).diff(minTimeDayJs, 'day') + 1;
  } else if (reportType === 'hourly') {
    elemsCount = dayjs(maxTime).diff(minTimeDayJs, 'hour') + 1;
  }

  const result = [];

  for (let iterator = 0, index = 0; iterator < elemsCount; iterator++) {
    const elem = {
      ...data[index],
      time: dayjs(data[index].time).utcOffset(0).format(),
    };

    if (elem.hasFault && !withFault) {
      elem.value = 0;
    }

    let diff = 0;

    if (reportType === 'daily') {
      diff = dayjs(elem.time).diff(minTimeDayJs, 'day');
    } else if (reportType === 'hourly') {
      diff = dayjs(elem.time).diff(minTimeDayJs, 'hour');
    }

    if (diff === iterator) {
      result.push(elem);
      index++;
    } else {
      result.push({
        time: minTimeDayJs.utcOffset(0).add(iterator, 'hour').format(),
        value: 0,
      });
    }
  }
  return result;
}

const getTaskXPos = (payload: GetTaskXPosPayload) => {
  const { currentData, minDate, maxDate, reportType } = payload;
  if (!currentData) {
    return null;
  }

  let diff = 0;
  if (reportType === 'hourly') {
    diff = dayjs(currentData).diff(dayjs(maxDate), 'hour');
  } else {
    diff = dayjs(currentData).diff(dayjs(maxDate), 'day');
  }

  if (diff > 0) {
    return null;
  }

  if (reportType === 'hourly') {
    const hourlyX = Math.round(
      dayjs(currentData).diff(dayjs(minDate), 'minutes') / 60,
    );

    return hourlyX;
  }
  const dailyX =
    dayjs(currentData).utc(true).diff(dayjs(minDate).startOf('day'), 'day') + 1;

  return dailyX;
};

export const getPreparedTaskData = ({
  taskByDate: task,
  maxValue,
  minDate,
  maxDate,
  reportType,
}: {
  taskByDate: TaskStatisticsItem;
  reportType: ReportType;
  maxValue: number;
  minDate: string;
  maxDate: string;
}) => {
  return {
    x: getTaskXPos({
      currentData: task?.firstTriggerTime,
      minDate,
      maxDate,
      reportType,
    }),
    y: maxValue * 0.9,
    amount: 1,
    isEmergency: task.isEmergency,
    isAllActive: !task.isClosed,
    taskInfo: {
      id: task.id,
      title: task.creationReason,
    },
  };
};

const getHourFromTimeStamp = (timeStamp: string): number => {
  return Number(dayjs(timeStamp).format('HH'));
};

const isHourMultiplySix = (timeStamp: string): boolean => {
  const hour = getHourFromTimeStamp(timeStamp);
  return hour % 6 === 0;
};

const getDayFromTimeStamp = (timeStamp: string): number => {
  return Number(dayjs(timeStamp, 'DD'));
};

const isDayMultiplyFive = (timeStamp: string): boolean => {
  const day = getDayFromTimeStamp(timeStamp);
  return day % 5 === 0;
};

export function sortArchiveArray<T>(archiveArr: (PreparedArchiveValues & T)[]) {
  const sortedArchive = archiveArr.sort((first, second) => {
    const firstDate = dayjs(first.time);
    const secondDate = dayjs(second.time);
    return firstDate.diff(secondDate);
  });

  return sortedArchive;
}

const formHourlyTicks = (
  archiveArr: PreparedArchiveValues[],
): PreparedArchiveValues[] => {
  if (archiveArr.length <= 24) return archiveArr;

  const sortedArchive = sortArchiveArray(archiveArr);
  const length = sortedArchive.length;

  return [
    sortedArchive[0],
    ...sortedArchive.filter(
      (entry, index) => length - index > 3 && isHourMultiplySix(entry.time),
    ),
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
  const date = dayjs(x).utcOffset(0);

  if (reportType === 'daily') {
    return date.format('DD.MM');
  }
  if (archiveArrLength >= 97) {
    return date.format('H');
  }
  return date.format('HH:mm');
};
