import _ from 'lodash';
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
