import { useEvent, useStore } from 'effector-react';
import React from 'react';
import {
  ExportSubscribersConsumptionContainer,
  exportSubscribersConsumptionService,
} from '../exportSubscribersConsumptionService';
import { displayStatisticsListByManagingFirmService } from './displayStatisticsListByManagingFirmService.model';
import { HousingStocksList } from './view/HousingStocksList';
import { ManagingFirmSearch } from './view/ManagingFirmSearch';
import { WithLoader } from 'ui-kit/shared/WithLoader';
import { addressSearchService } from 'services/addressSearchService/addressSearchService.models';

const { gates, outputs, inputs } = displayStatisticsListByManagingFirmService;
const { StatiscticsPageGate } = gates;
const { ExistingCitiesGate } = addressSearchService.gates;

export const DisplayStatisticsListByManagingFirmContainer = () => {
  const cities = useStore(outputs.$cities);
  const managingFirms = useStore(outputs.$managingFirms);
  const selectedManagingFirm = useStore(outputs.$selectedManagingFirm);
  const selectedCity = useStore(outputs.$selectedCity);
  const housingStocks = useStore(outputs.$housingStocks);
  const housingStocksIsLoading = useStore(outputs.$housingStocksIsLoading);
  const statisticIsLoading = useStore(outputs.$statisticIsLoading);
  const selectedHousingStock = useStore(outputs.$selectedHousingStock);
  const filter = useStore(outputs.$subscriberStatisticsFilter);
  const managingFirmsLoading = useStore(outputs.$managingFirmsLoading);

  const setFilter = useEvent(inputs.setSubscriberStatisticsFilter);
  const selectCity = useEvent(inputs.selectCity);
  const selectManagingFirm = useEvent(inputs.selectManagingFirm);
  const selectHousingStock = useEvent(inputs.selectHousingStock);
  const handleOpenModal = useEvent(
    exportSubscribersConsumptionService.inputs.openModal,
  );
  const setFileName = useEvent(
    exportSubscribersConsumptionService.inputs.setFileName,
  );

  return (
    <>
      <ExportSubscribersConsumptionContainer filter={filter} />
      <ExistingCitiesGate />
      <StatiscticsPageGate />
      <ManagingFirmSearch
        cities={cities || []}
        managingFirms={managingFirms}
        selectedManagingFirm={selectedManagingFirm}
        selectManagingFirm={selectManagingFirm}
        selectedCity={selectedCity}
        selectCity={selectCity}
        filter={filter}
        setFilter={setFilter}
        managingFirmsLoading={managingFirmsLoading}
      />
      <WithLoader isLoading={housingStocksIsLoading}>
          <HousingStocksList
            housingStocks={housingStocks}
            selectHousingStock={selectHousingStock}
            statisticIsLoading={statisticIsLoading}
            handleOpenModal={handleOpenModal}
            selectedHousingStock={selectedHousingStock}
            setFileName={setFileName}
          />
      </WithLoader>
    </>
  );
};
