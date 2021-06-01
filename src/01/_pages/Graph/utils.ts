import { format } from 'date-fns';
import {
  ArchiveEntryInterface,
  GraphDataInterface,
  ReportType,
} from './components/GraphView';
import { GraphParamsType } from './Graph';
import { EResourceType } from '../../../myApi';

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

const formHourlyTicks = (
  archiveArr: ArchiveEntryInterface[]
): ArchiveEntryInterface[] => {
  if (archiveArr.length <= 24) return archiveArr;
  return [
    ...archiveArr.filter((entry) => isHourMultiplySix(entry.timestamp)),
    archiveArr[archiveArr.length - 1],
  ];
};

const formDailyTicks = (
  archiveArr: ArchiveEntryInterface[]
): ArchiveEntryInterface[] => {
  if (archiveArr.length <= 14) return archiveArr;

  const length = archiveArr.length;
  const multipleFives = archiveArr.filter((entry) =>
    isDayMultiplyFive(entry.timestamp)
  );
  const delta1 =
    getDayFromTimeStamp(multipleFives[0].timestamp) -
    getDayFromTimeStamp(archiveArr[0].timestamp);
  const delta2 =
    getDayFromTimeStamp(archiveArr[length - 1].timestamp) -
    getDayFromTimeStamp(multipleFives[multipleFives.length - 1].timestamp);
  const sliceParam1 = delta1 < 2 ? 1 : 0;
  const sliceParam2 =
    delta2 < 2 ? multipleFives.length - 1 : multipleFives.length;

  return [
    archiveArr[0],
    ...multipleFives.slice(sliceParam1, sliceParam2),
    archiveArr[length - 1],
  ];
};

export const formTicks = (
  archiveArr: ArchiveEntryInterface[],
  reportType: ReportType
): ArchiveEntryInterface[] => {
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
  archiveArr: ArchiveEntryInterface[],
  reportType: ReportType,
  x: string
) => {
  if (reportType === 'daily') {
    return format(formatDate(x), 'dd.MM');
  }
  if (archiveArr.length <= 24) {
    return format(formatDate(x), 'HH');
  }

  if (archiveArr.length >= 97) {
    return format(formatDate(x), 'H');
  }

  return format(formatDate(x), 'HH:mm');
};

export const getGraphParams = (
  resource: EResourceType,
  pipeCount: number
): GraphParamsType[] => {
  switch (resource) {
    case 'ColdWaterSupply':
      return ['inputVolume'];
    case 'HotWaterSupply':
      return pipeCount === 1
        ? ['energy', 'inputVolume', 'inputMass']
        : [
            'energy',
            'inputMass',
            'outputMass',
            'deltaMass',
            'inputVolume',
            'outputVolume',
            'deltaVolume',
          ];
    case 'Heat':
      return pipeCount === 1
        ? ['energy', 'inputVolume', 'inputMass']
        : [
            'energy',
            'inputMass',
            'outputMass',
            'deltaMass',
            'inputVolume',
            'outputVolume',
            'deltaVolume',
          ];
    default:
      console.log(
        'Ресурс',
        resource,
        'и количество труб ',
        pipeCount,
        'не предусмотрено'
      );
      return [];
  }
};

export const paramsTranslation: Partial<
  { [key in GraphParamsType]: string }
> = {
  inputVolume: 'Входящий объем, м³',
  outputVolume: 'Выходящий объем, м³',
  deltaVolume: 'Расход по объему, м³',
  inputMass: 'Входящая масса, т',
  outputMass: 'Выходящая масса, т',
  deltaMass: 'Расход по массе, т',
  energy: 'Энергия, ГКал',
};

export const formGraphData = (
  ticks: ArchiveEntryInterface[],
  graphParam: GraphParamsType
): GraphDataInterface[] => {
  return ticks.map((entry) => {
    return {
      time: entry.timestamp,
      value: entry[graphParam],
    };
  });
};
