import { ResourceType } from '../GraphView/GraphView.types';

export const renderForHeatAndDeltaMass = (
  resource: ResourceType,
  graphParam: string,
) => {
  return resource === 'HotWaterSupply' && graphParam === 'Расход по массе, т';
};
