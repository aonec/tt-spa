import React, { FC } from 'react';
import { HousingStockItem } from './views/HousingStockItem/';
import { HousingStockItemContainerProps } from './types';
import { useEvent, useStore } from 'effector-react';
import { inspectorHousingStockService } from './inspectorHousingStockService.models';

export const HousingStockItemContainer: FC<HousingStockItemContainerProps> = ({
  housingStock,
}) => {
  const days = inspectorHousingStockService.outputs.days;
  const inspectors = useStore(inspectorHousingStockService.outputs.$inspectors);
  const updates = useStore(
    inspectorHousingStockService.outputs.$currentHousingStockUpdates
  );

  const update = updates.find(
    (elem) => elem.housingStock.housingStockId === housingStock.housingStockId
  );

  const updateHousingStock = useEvent(
    inspectorHousingStockService.inputs.updateHousingStockInspectorInfo
  );

  return (
    <HousingStockItem
      housingStock={housingStock}
      inspectors={inspectors}
      days={days}
      update={update}
      updateHousingStock={(updatedData) =>
        updateHousingStock({ housingStock, updatedData })
      }
    />
  );
};
