import _ from 'lodash';
import moment from 'moment';
import { getMinAndMax } from 'utils/Graph.utils';

const minDelta = 0.01;

export function getMinAndMaxForResourceConsumptionGraph<T>(
  dataArr: (T & { value: number }[])[]
) {
  const bordersArr = dataArr.map((data) => getMinAndMax(data, minDelta));

  const minValue =
    _.minBy(bordersArr, (borders) => borders.minValue)?.minValue || 0;
  const maxValue =
    _.maxBy(bordersArr, (borders) => borders.maxValue)?.maxValue || 0;

  return { minValue, maxValue };
}

export function prepareDataForConsumptionGraph<T>(
  dataArr: (T & { key?: string })[]
) {
  const startOfMonth = moment(dataArr[0].key).startOf('month');

  return dataArr.map((elem) => ({
    ...elem,
    key: String(moment(elem.key).diff(startOfMonth, 'day') + 1),
  }));
}
