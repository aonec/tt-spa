import React from 'react';
import { EditObjectPage } from './view/EditObjectPage';
import { useParams } from 'react-router-dom';
import { editObjectService } from './editObjectService.model';
import { useEvent, useStore } from 'effector-react';
import { addressSearchService } from 'services/addressSearchService/addressSearchService.models';

const { outputs, gates, inputs } = editObjectService;
const { FetchObjectGate } = gates;

export const EditObjectContainer = () => {
  const { housingStockId } = useParams<{ housingStockId: string }>();

  const housingStockIdNumber = Number(housingStockId);

  const housingStock = useStore(outputs.$housingStock);
  const houseManagements = useStore(outputs.$houseManagements);
  const heatingStations = useStore(outputs.$heatingStations);

  const existingCities = useStore(addressSearchService.outputs.cities);
  const existingStreets = useStore(addressSearchService.outputs.streets);

  const openCreateHeatingStationModal = useEvent(
    inputs.openCreateHeatingStationModal,
  );
  const openEditHeatingStationModal = useEvent(
    inputs.openEditHeatingStationModal,
  );
  const heatingStationCapture = useEvent(inputs.heatingStationCapture);

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
          houseManagements={houseManagements}
          openCreateHeatingStationModal={() => openCreateHeatingStationModal()}
          openEditHeatingStationModal={() => openEditHeatingStationModal()}
          heatingStations={heatingStations}
          heatingStationCapture={heatingStationCapture}
        />
      )}
    </>
  );
};
