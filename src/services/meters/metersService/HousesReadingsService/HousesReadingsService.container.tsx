import React from 'react';
import { useEvent, useStore } from 'effector-react';
import { useParams } from 'react-router-dom';
import { HousesReadingsPage } from './view/HousesReadingsPage';
import { housesReadingsService } from './HousesReadingsService.model';

const { inputs, outputs, gates } = housesReadingsService;
const { HousingStockGate, InspectorGate } = gates;

export const HousesReadingsContainer = () => {
  const { id } = useParams<{ id?: string }>();

  const housingStockId = Number(id) || null;

  const housingStock = useStore(outputs.$housingStock);
  const isLoadingHousingStock = useStore(outputs.$isLoadingHousingStock);
  const inspector = useStore(outputs.$inspector)

  const handleSearchHousingStock = useEvent(inputs.handleSearchHousingStock);

  return (
    <>
      <HousingStockGate housingStockId={housingStockId} />
      {housingStock?.inspectorId && (
        <InspectorGate id={housingStock.inspectorId} />
      )}
      <HousesReadingsPage
        housingStock={housingStock}
        handleSearchHousingStock={handleSearchHousingStock}
        isLoadingHousingStock={isLoadingHousingStock}
        inspector={inspector}
      />
    </>
  );
};
