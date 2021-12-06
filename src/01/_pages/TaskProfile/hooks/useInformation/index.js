import { information } from '01/r_comp';
import { useInfoHeader } from './useInfoHeder';

const taskInfo = [
  ['Причина задачи', 'creationReason'],
  ['Номер задачи', 'id'],
  ['Дата создания', 'creationTime'],
  ['Адрес', 'address', 'housingStockId'],
  ['Исполнитель', 'perpetrator', 'name'],
];

export const useInformation = (state = {}) => {
  createInfoHeader(state);
  return {
    loading: false,
    list: taskInfo.reduce((l, { 0: title, 1: value, 2: url }) => {
      if (/дата/i.test(title)) {
        return [
          ...l,
          {
            title,
            value: state[value]
              ? new Date(state[value]).toLocaleDateString()
              : '',
          },
        ];
      }
      if (/Исполнитель/i.test(title)) {
        return [
          ...l,
          {
            title,
            value: state[value] ? state[value][url] : '-',
          },
        ];
      }
      if (/адрес/i.test(title)) {
        return [
          ...l,
          {
            title,
            value: state[value],
            url: `/objects/${state[url]}`,
          },
        ];
      }

      return [...l, { title, value: state[value] ?? '-' }];
    }, []),
  };
};

function createInfoHeader(state = {}) {}

export default useInformation;
