import { maxBy } from 'lodash';
import { ChartType } from '../StatisticItem.types';

const factor = 1.2;

export function getMax(data: ChartType[] | null) {
  const maxElementValue = maxBy(data, (obj) => obj.y);

  const maxValue = maxElementValue?.y ? factor * maxElementValue.y : 0;

  return Math.round(maxValue);
}
