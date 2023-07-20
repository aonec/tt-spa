import { EResourceType } from 'api/myApi';

export const renderForHeatAndDeltaMass = (
  resource: EResourceType,
  graphParam: string,
) => {
  return (
    resource === EResourceType.HotWaterSupply &&
    graphParam === 'Расход по массе, т'
  );
};
