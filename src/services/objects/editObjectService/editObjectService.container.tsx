import React from 'react';
import { EditObjectPage } from './view/EditObjectPage';
import { useParams } from 'react-router-dom';
import { editObjectService } from './editObjectService.model';
import { useStore } from 'effector-react';
import { addressSearchService } from 'services/addressSearchService/addressSearchService.models';

const { inputs, outputs, gates } = editObjectService;
const { FetchObjectGate } = gates;

export const EditObjectContainer = () => {
  const { housingStockId } = useParams<{ housingStockId: string }>();

  const housingStockIdNumber = Number(housingStockId);

  const housingStock = useStore(outputs.$housingStock);

  const existingCities = useStore(addressSearchService.outputs.cities);
  const existingStreets = useStore(addressSearchService.outputs.streets);

  const isReasonToFetchHousingStock =
    !housingStock || housingStock.id !== housingStockIdNumber;

  return (
    <>
      {isReasonToFetchHousingStock && (
        <FetchObjectGate objectId={housingStockIdNumber} />
      )}
      {housingStock && (
        <EditObjectPage
          housingStock={housingStock}
          existingCities={existingCities}
          existingStreets={existingStreets}
        />
      )}
    </>
  );
};
