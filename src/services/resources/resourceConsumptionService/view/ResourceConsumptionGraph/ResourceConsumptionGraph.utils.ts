import { getResourceColor } from '01/utils/getResourceColor';
import { EResourceType } from 'myApi';
import { getMinAndMax } from 'utils/Graph.utils';
import { ResourceConsumptionGraphType } from '../../resourceConsumptionService.types';
import { ResourceConsumptionGraphColors } from './ResourceConsumptionGraph.constants';

const minDelta = 0.01;

export function getMinAndMaxForResourceConsumptionGraph<T>(
  dataArr: (T & { value: number }[])[],
) {
  return getMinAndMax(dataArr.flat(), minDelta);
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
