import { maxBy, minBy } from 'lodash';
import { EResourceType } from 'myApi';
import { PreparedArchiveValues } from 'services/nodes/displayNodesStatisticsService/view/StatisticsGraph/StatisticsGraph.types';

export function getMinAndMax<T>(
  data: (T & { value: number | null })[],
  minDelta: number,
) {
  const minElementValue = minBy(data, (obj) => obj.value)?.value || 0;
  const maxElementValue = maxBy(data, (obj) => obj.value)?.value || 0;

  let minValue = minElementValue > 0 ? 0 : 1.5 * minElementValue;
  let maxValue = maxElementValue < 0 ? 0 : 1.5 * maxElementValue;

  if (maxValue === minValue && minValue === 0) {
    maxValue += minDelta;
  }

  if (maxValue / 2 > Math.abs(minValue) && minValue < 0) {
    minValue = -maxValue / 2;
  }

  if (Math.abs(minValue) / 2 > maxValue) {
    maxValue = -minValue / 2;
  }

  return { minValue, maxValue };
}

export function prepareData<T>(data: (T & { value?: number | null })[]) {
  return data.reduce((acc, reading) => {
    if (reading?.value === undefined) {
      return acc;
    }
    return [...acc, reading as T & PreparedArchiveValues];
  }, [] as (T & PreparedArchiveValues)[]);
}

export const GraphColorLookup: { [key in EResourceType]: string } = {
  [EResourceType.HotWaterSupply]: '#ff8c68',
  [EResourceType.ColdWaterSupply]: '#79afff',
  [EResourceType.Electricity]: '#e2b104',
  [EResourceType.Heat]: '#9254de',
};
