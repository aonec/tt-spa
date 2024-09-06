import { YearRangeType } from 'api/types';

export const yearRangeTypeWithLabel = [
  { value: YearRangeType.FirstHalf, label: 'Январь-Июнь, включительно' },
  { value: YearRangeType.SecondHalf, label: 'Июль-Декабрь, включительно' },
];

export const YearRangeDictionary: {
  [key in YearRangeType]: string;
} = {
  [YearRangeType.FirstHalf]: 'Январь-Июнь, включительно',
  [YearRangeType.SecondHalf]: 'Июль-Декабрь, включительно',
};
