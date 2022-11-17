import { useEvent, useStore } from 'effector-react';
import React from 'react';
import { objectMapsService } from './objectMapsService.model';
import { ObjectsMaps } from './view/ObjectsMaps';

const { inputs, outputs, gates } = objectMapsService;
const { StreetsWithHousingStocksGate } = gates;

export const ObjectMapsContainer = () => {
  const streetsData = useStore(outputs.$addressesPagedList);
  const housingStock = useStore(outputs.$housingStock);
  const isLoadingHousingStock = useStore(outputs.$isLoadingHousingStock);

  const handleClickHousingStock = useEvent(inputs.handleClickHousingStock);
  const clearHosuingStock = useEvent(inputs.clearHosuingStock);

  return (
    <>
      <StreetsWithHousingStocksGate />
      <ObjectsMaps
        handleClickHousingStock={handleClickHousingStock}
        housingStock={housingStock}
        isLoadingHousingStock={isLoadingHousingStock}
        streetsData={streetsData?.items || null}
        clearHosuingStock={() => clearHosuingStock()}
      />
    </>
  );
};
