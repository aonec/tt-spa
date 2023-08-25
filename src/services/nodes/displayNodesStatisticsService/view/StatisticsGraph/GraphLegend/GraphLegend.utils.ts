import { EResourceType } from 'api/types';

export const renderForHeatAndDeltaMass = (
  resource: EResourceType,
  graphParam: string,
) => {
  return (
    resource === EResourceType.HotWaterSupply &&
    graphParam === 'Расход по массе, т'
  );
};
