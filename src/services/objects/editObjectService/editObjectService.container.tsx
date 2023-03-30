import React, { useEffect } from 'react';
import { EditObjectPage } from './view/EditObjectPage';
import { useHistory, useParams } from 'react-router-dom';
import { editObjectService } from './editObjectService.model';
import { useEvent, useStore } from 'effector-react';
import { addressSearchService } from 'services/addressSearchService/addressSearchService.models';

const { inputs, outputs, gates } = editObjectService;
const { FetchObjectGate, CatchHousingStockId } = gates;

export const EditObjectContainer = () => {
  const { housingStockId } = useParams<{ housingStockId: string }>();
  const history = useHistory();

  const housingStockIdNumber = Number(housingStockId);

  const existingCities = useStore(addressSearchService.outputs.cities);
  const existingStreets = useStore(addressSearchService.outputs.streets);

  const housingStock = useStore(outputs.$housingStock);
  const houseManagements = useStore(outputs.$houseManagements);
  const isHouseManagementsLoading = useStore(
    outputs.$isHouseManagementsLoading,
  );
  const heatingStations = useStore(outputs.$heatingStations);
  const isHeatingStationsLoading = useStore(outputs.$isHeatingStationsLoading);

  const openCreateHeatingStationModal = useEvent(
    inputs.openCreateHeatingStationModal,
  );
  const openEditHeatingStationModal = useEvent(
    inputs.openEditHeatingStationModal,
  );
  const heatingStationCapture = useEvent(inputs.heatingStationCapture);

  const onPageCancel = useEvent(inputs.onPageCancel);
  const handleUpdateHousingStock = useEvent(inputs.handleUpdateHousingStock);

  const isReasonToFetchHousingStock =
    !housingStock || housingStock.id !== housingStockIdNumber;

  useEffect(() => {
    inputs.onPageCancel.watch(() =>
      history.push(`/objects/profile/${housingStockId}`),
    );
  }, [history, housingStockId]);

  return (
    <>
      <CatchHousingStockId housingStockId={housingStockIdNumber} />
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
          onPageCancel={onPageCancel}
          handleUpdateHousingStock={handleUpdateHousingStock}
          isHouseManagementsLoading={isHouseManagementsLoading}
          isHeatingStationsLoading={isHeatingStationsLoading}
        />
      )}
    </>
  );
};
