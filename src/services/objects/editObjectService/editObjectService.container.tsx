import React, { useEffect } from 'react';
import { EditObjectPage } from './view/EditObjectPage';
import { useHistory, useParams } from 'react-router-dom';
import { editObjectService } from './editObjectService.model';
import { useEvent, useStore } from 'effector-react';
import { addressSearchService } from 'services/addressSearchService/addressSearchService.models';
import { createObjectService } from '../createObjectService';

const { inputs, outputs, gates } = editObjectService;
const { FetchObjectGate, CatchHousingStockId } = gates;

const {
  gates: { HeatingStationsFetchGate, HouseManagementsFetchGate },
} = createObjectService;

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

  const isDeleteLoading = useStore(outputs.$isDeleteLoading);
  const isUpdateLoading = useStore(outputs.$isUpdateLoading);
  const isCreateLoading = useStore(outputs.$isCreateLoading);

  const openCreateHeatingStationModal = useEvent(
    inputs.openCreateHeatingStationModal,
  );
  const openEditHeatingStationModal = useEvent(
    inputs.openEditHeatingStationModal,
  );
  const heatingStationCapture = useEvent(inputs.heatingStationCapture);

  const onPageCancel = useEvent(inputs.onPageCancel);
  const handleUpdateHousingStock = useEvent(inputs.handleUpdateHousingStock);

  const handleCreateHousingStockAddress = useEvent(
    inputs.handleCreateHousingStockAddress,
  );
  const handleUpdateHousingStockAddress = useEvent(
    inputs.handleUpdateHousingStockAddress,
  );
  const handleDeleteHousingStockAddress = useEvent(
    inputs.handleDeleteHousingStockAddress,
  );

  const isReasonToFetchHousingStock =
    !housingStock || housingStock.id !== housingStockIdNumber;

  useEffect(() => {
    return inputs.onPageCancel.watch(() =>
      history.push(`/objects/profile/${housingStockId}`),
    ).unsubscribe;
  }, [history, housingStockId]);

  useEffect(() => {
    return inputs.successUpdate.watch(() =>
      history.push(`/objects/profile/${housingStockId}`),
    ).unsubscribe;
  }, [history, housingStockId]);

  return (
    <>
      <CatchHousingStockId housingStockId={housingStockIdNumber} />
      {isReasonToFetchHousingStock && (
        <FetchObjectGate objectId={housingStockIdNumber} />
      )}
      <HouseManagementsFetchGate />
      <HeatingStationsFetchGate />
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
          handleCreateHousingStockAddress={handleCreateHousingStockAddress}
          handleUpdateHousingStockAddress={handleUpdateHousingStockAddress}
          handleDeleteHousingStockAddress={handleDeleteHousingStockAddress}
          isDeleteLoading={isDeleteLoading}
          isCreateLoading={isCreateLoading}
          isUpdateLoading={isUpdateLoading}
        />
      )}
    </>
  );
};
