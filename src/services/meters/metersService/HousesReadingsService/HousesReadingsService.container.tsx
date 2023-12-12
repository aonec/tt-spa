import React, { useEffect } from 'react';
import { useUnit } from 'effector-react';
import {  useNavigate, useParams } from 'react-router-dom';
import { HousesReadingsPage } from './view/HousesReadingsPage';
import { housesReadingsService } from './HousesReadingsService.model';
import { ReadingsHistoryContainer } from 'services/meters/readingsHistoryService/readingsHistoryService.container';
import { useManagingFirmConsumptionRates } from 'services/meters/managementFirmConsumptionRatesService';
import { ConfirmReadingValueContainer } from 'services/meters/readingsHistoryService/confirmReadingService';
import { getHousingStockQuery } from './HousesReadingsService.api';

const { inputs, outputs, gates } = housesReadingsService;
const { HousingStockGate, InspectorGate } = gates;

export const HousesReadingsContainer = () => {
  const { id } = useParams<{ id?: string }>();
  const navigate =  useNavigate();

  const housingStockId = Number(id) || null;
  const {
    consumptionRates,
    handleSearchHousingStock,
    housingStock,
    individualDevicesList,
    inspector,
    isAllDevicesLoaded,
    isHousingStockFetched,
    isLoadingHousingStock,
    isLoadingIndividualDevices,
    loadConsumptionRates,
    loadNextPageOfIndividualDevicesList,
    openReadingsHistoryModal,
    totalItems,
  } = useUnit({
    housingStock: outputs.$housingStock,
    isHousingStockFetched: getHousingStockQuery.$succeeded,
    isLoadingHousingStock: outputs.$isLoadingHousingStock,
    inspector: outputs.$inspector,
    individualDevicesList: outputs.$individualDevices,
    isLoadingIndividualDevices: outputs.$isLoadingIndividualDevices,
    consumptionRates: outputs.$consumptionRates,
    isAllDevicesLoaded: outputs.$isAllDevicesLoaded,
    handleSearchHousingStock: inputs.handleSearchHousingStock,
    loadNextPageOfIndividualDevicesList:
      inputs.loadNextPageOfIndividualDevicesList,
    loadConsumptionRates: inputs.loadManagemenFirmConsumptionRates,
    openReadingsHistoryModal: inputs.openReadingsHistoryModal,
    totalItems: outputs.$totalItems,
  });

  const { managementFirmConsumptionRates } = useManagingFirmConsumptionRates(
    consumptionRates,
    loadConsumptionRates,
    housingStock?.managingFirmId,
  );

  useEffect(() => {
    return inputs.handleHousingStockLoaded.watch(({ result: housingStock }) => {
      if (!housingStock || Number(id) === housingStock?.id) return;

       navigate(`/meters/houses/${housingStock.id}`);
    }).unsubscribe;
  }, [navigate, id]);

  return (
    <>
      <HousingStockGate housingStockId={housingStockId} />
      {housingStock?.inspectorId && (
        <InspectorGate id={housingStock.inspectorId} />
      )}
      <ReadingsHistoryContainer />
      <ConfirmReadingValueContainer />
      <HousesReadingsPage
        housingStock={housingStock}
        handleSearchHousingStock={handleSearchHousingStock}
        isLoadingHousingStock={isLoadingHousingStock}
        inspector={inspector}
        individualDevicesList={individualDevicesList}
        loadNextPageOfIndividualDevicesList={() =>
          loadNextPageOfIndividualDevicesList()
        }
        isLoadingIndividualDevices={isLoadingIndividualDevices}
        managementFirmConsumptionRates={managementFirmConsumptionRates}
        openReadingsHistoryModal={openReadingsHistoryModal}
        isAllDevicesLoaded={isAllDevicesLoaded}
        isHousingStockFetched={isHousingStockFetched}
        totalItems={totalItems}
      />
    </>
  );
};
