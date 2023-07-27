import { EResourceType } from 'api/types';
import { getMinAndMax, GraphColorLookup } from 'utils/Graph.utils';
import { ResourceConsumptionGraphType } from '../../resourceConsumptionService.types';
import { ResourceConsumptionGraphColors } from './ResourceConsumptionGraph.constants';

const minDelta = 0.01;

export function getMinAndMaxForResourceConsumptionGraph<T>(
  dataArr: ((T & { value: number }[]) | null)[],
) {
  const filteredDataArr = dataArr.filter((data) => Boolean(data)) as (T &
    { value: number }[])[];

  return getMinAndMax(filteredDataArr?.flat(), minDelta);
}

export const getGraphTypeColors = ({
  resource,
  type,
  isOpacityNeed,
}: {
  resource: EResourceType;
  type: ResourceConsumptionGraphType;
  isOpacityNeed?: boolean;
}) => {
  let color = ResourceConsumptionGraphColors[type];

  if (type === ResourceConsumptionGraphType.Housing) {
    color = GraphColorLookup[resource];
  }

  if (isOpacityNeed) {
    color = `${color}99`;
  }
  return color;
};

export function hasNoConsecutiveNumbers(
  arr: { key?: string; value?: number | null | undefined }[],
): boolean {
  let count = 0;
  for (let i = 0; i < arr.length; i++) {
    if (typeof arr[i].value === 'number') {
      count++;
      if (count >= 3) {
        return false;
      }
    } else {
      count = 0;
    }
  }
  return true;
}
