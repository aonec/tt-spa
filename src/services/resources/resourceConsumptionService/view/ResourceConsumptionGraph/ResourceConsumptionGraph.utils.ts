import { getResourceColor } from '01/utils/getResourceColor';
import _ from 'lodash';
import { EResourceType } from 'myApi';
import { getMinAndMax } from 'utils/Graph.utils';
import { ResourceConsumptionGraphType } from '../../resourceConsumptionService.types';
import { ResourceConsumptionGraphColors } from './ResourceConsumptionGraph.constants';

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
    color = getResourceColor(resource);
  }

  if (isOpacityNeed) {
    color = `${color}99`;
  }
  return color;
};
