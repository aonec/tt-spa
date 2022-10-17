import { ResourceType } from '../components/GraphView/GraphView.types';

export const renderForHeatAndDeltaMass = (
  resource: ResourceType,
  graphParam: string
) => {
  return resource === 'Heat' && graphParam === 'deltaMass';
};
