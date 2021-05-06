import { ResourceType } from '../components/GraphView';
import { GraphParamsType } from '../Graph';

export const renderForHeatAndDeltaMass = (
  resource: ResourceType,
  graphParam: GraphParamsType
) => {
  return resource === 'Heat' && graphParam === 'deltaMass';
};
