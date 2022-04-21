import React, { FC } from 'react';
import { HousingStockItem } from './views/HousingStockItem/';
import { HousingStockItemContainerProps } from './types';
import { useStore } from 'effector-react';
import { inspectorHousingStockService } from './inspectorHousingStockService.models';

export const HousingStockItemContainer: FC<HousingStockItemContainerProps> = ({
  housingStock,
}) => {
  const inspectors = useStore(inspectorHousingStockService.outputs.$inspectors);
  const days = inspectorHousingStockService.outputs.days;

  return (
    <HousingStockItem
      housingStock={housingStock}
      inspectors={inspectors}
      days={days}
    />
  );
};
