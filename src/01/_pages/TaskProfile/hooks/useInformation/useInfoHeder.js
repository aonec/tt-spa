/* eslint-disable */

const titles = ['Причина задачи', 'Номер задачи', 'Дата создания', 'Адрес'];

export function check(regExp = '', str = '', flags = 'gi') {
  const exp = new RegExp(regExp, flags);
  return exp.test(str);
}

export const useInfoHeader = (values = [], type = '', id = '') =>
  titles.map((title, i) => {
    if (check('дата', title)) {
    }
    if (i === 3 && type === 'IndividualDeviceCheck') {
    }
    return [title, values[i]];
  });
