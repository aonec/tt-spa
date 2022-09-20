import moment from 'moment';
import { TreeSelectElement } from '../CreateResourceDisconnectionModal/CreateResourceDisconnectionModal.types';

export const getDate = (date: string, hour: string) =>
  moment(`${date} ${hour}`, 'DD.MM.YYYY HH:00').toISOString();

export const getAllHousingStocks = (items: TreeSelectElement[]): number[] =>
  items.reduce((acc, item) => {
    const children = item?.children;
    if (!children) {
      return [...acc, Number(item.value)];
    }
    const allHousingStocks = getAllHousingStocks(children);
    return [...acc, ...allHousingStocks];
  }, [] as number[]);
  
