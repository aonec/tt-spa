import { DigitCountTextList } from 'utils/getCountText';

export const pipeRupturesDictionary: DigitCountTextList = [
  {
    digits: [1],
    text: 'порыв',
  },
  { digits: [0, 5, 6, 7, 8, 9, 11, 12, 13, 14], text: 'порывов' },
  { digits: [2, 3, 4], text: 'порыва' },
];

export const resourceDisconnectsDictionary: DigitCountTextList = [
  {
    digits: [1],
    text: 'отключение',
  },
  { digits: [0, 5, 6, 7, 8, 9, 11, 12, 13, 14], text: 'отключений' },
  { digits: [2, 3, 4], text: 'отключения' },
];

export const malfunctionsDictionary: DigitCountTextList = [
  {
    digits: [1],
    text: 'неисправность',
  },
  { digits: [0, 5, 6, 7, 8, 9, 11, 12, 13, 14], text: 'неисправностей' },
  { digits: [2, 3, 4], text: 'неисправности' },
];

export const tasksCountDictionary: DigitCountTextList = [
  {
    digits: [1],
    text: 'задача',
  },
  { digits: [0, 5, 6, 7, 8, 9, 11, 12, 13, 14], text: 'задач' },
  { digits: [2, 3, 4], text: 'задачи' },
];
