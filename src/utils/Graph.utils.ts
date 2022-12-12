import { PreparedArchiveValues } from '01/_pages/Graph/components/GraphView/GraphView.types';
import { maxBy, minBy } from 'lodash';

export function getMinAndMax<T>(
  data: (T & { value: number })[],
  minDelta: number
) {
  const minElementValue = minBy(data, (obj) => obj.value)?.value || 0;
  const maxElementValue = maxBy(data, (obj) => obj.value)?.value || 0;

  let minValue = minElementValue > 0 ? 0 : 1.5 * minElementValue;
  let maxValue = maxElementValue < 0 ? 0 : 1.5 * maxElementValue;

  if (maxValue === minValue && minValue === 0) maxValue += minDelta;
  if (maxValue / 2 > Math.abs(minValue) && minValue < 0) {
    minValue = -maxValue / 2;
  }
  if (Math.abs(minValue) / 2 > maxValue) {
    maxValue = -minValue / 2;
  }

  return { minValue, maxValue };
}

export function prepareData<T>(data: (T & { value?: number })[]) {
  return data.reduce((acc, reading) => {
    if (reading?.value === undefined) {
      return acc;
    }
    return [...acc, reading as T & PreparedArchiveValues];
  }, [] as (T & PreparedArchiveValues)[]);
}
