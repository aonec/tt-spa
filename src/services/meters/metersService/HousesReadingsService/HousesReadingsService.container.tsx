import React, { useEffect } from 'react';
import { useEvent, useStore } from 'effector-react';
import { useHistory, useParams } from 'react-router-dom';
import { HousesReadingsPage } from './view/HousesReadingsPage';
import { housesReadingsService } from './HousesReadingsService.model';
import { ReadingsHistoryModal } from '01/features/readings/displayReadingHistory/ReadingsHistoryModal';
import { useManagingFirmConsumptionRates } from 'services/meters/managementFirmConsumptionRatesService';
import { ConfirmReadingValueModal } from '01/features/readings/readingsInput/confirmInputReadingModal';

const { inputs, outputs, gates } = housesReadingsService;
const { HousingStockGate, InspectorGate } = gates;

export const HousesReadingsContainer = () => {
  const { id } = useParams<{ id?: string }>();
  const history = useHistory();

  const housingStockId = Number(id) || null;

  const housingStock = useStore(outputs.$housingStock);
  const isLoadingHousingStock = useStore(outputs.$isLoadingHousingStock);
  const inspector = useStore(outputs.$inspector);
  const individualDevicesList = useStore(outputs.$individualDevices);
  const isLoadingIndividualDevices = useStore(
    outputs.$isLoadingIndividualDevices
  );
  const consumptionRates = useStore(outputs.$consumptionRates);
  const isAllDevicesLoaded = useStore(outputs.$isAllDevicesLoaded);
  const pagedList = useStore(outputs.$individualDevicesPagedList);

  const handleSearchHousingStock = useEvent(inputs.handleSearchHousingStock);
  const loadNextPageOfIndividualDevicesList = useEvent(
    inputs.loadNextPageOfIndividualDevicesList
  );
  const loadConsumptionRates = useEvent(
    inputs.loadManagemenFirmConsumptionRates
  );
  const openReadingsHistoryModal = useEvent(inputs.openReadingsHistoryModal);

  const { managementFirmConsumptionRates } = useManagingFirmConsumptionRates(
    consumptionRates,
    loadConsumptionRates,
    housingStock?.managingFirmId
  );

  useEffect(() => {
    return inputs.handleHousingStockLoaded.watch((housingStock) => {
      if (!housingStock) return;

      history.push(`/meters/houses/${housingStock.id}`);
    }).unsubscribe;
  }, []);

  const allDevicesLength = pagedList?.totalItems;

  return (
    <>
      <HousingStockGate housingStockId={housingStockId} />
      {housingStock?.inspectorId && (
        <InspectorGate id={housingStock.inspectorId} />
      )}
      <ReadingsHistoryModal />
      <ConfirmReadingValueModal />
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
        allDevicesLength={allDevicesLength}
      />
    </>
  );
};
