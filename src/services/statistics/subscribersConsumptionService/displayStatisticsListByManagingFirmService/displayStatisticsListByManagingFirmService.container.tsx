import { useUnit } from 'effector-react';
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
  const {
    cities,
    filter,
    handleOpenModal,
    housingStocks,
    housingStocksIsLoading,
    managingFirms,
    managingFirmsLoading,
    selectCity,
    selectHousingStock,
    selectManagingFirm,
    selectedCity,
    selectedHousingStock,
    selectedManagingFirm,
    setFileName,
    setFilter,
    statisticIsLoading,
  } = useUnit({
    cities: outputs.$cities,
    managingFirms: outputs.$managingFirms,
    selectedManagingFirm: outputs.$selectedManagingFirm,
    selectedCity: outputs.$selectedCity,
    housingStocks: outputs.$housingStocks,
    housingStocksIsLoading: outputs.$housingStocksIsLoading,
    statisticIsLoading: outputs.$statisticIsLoading,
    selectedHousingStock: outputs.$selectedHousingStock,
    filter: outputs.$subscriberStatisticsFilter,
    managingFirmsLoading: outputs.$managingFirmsLoading,
    setFilter: inputs.setSubscriberStatisticsFilter,
    selectCity: inputs.selectCity,
    selectManagingFirm: inputs.selectManagingFirm,
    selectHousingStock: inputs.selectHousingStock,
    handleOpenModal: exportSubscribersConsumptionService.inputs.openModal,
    setFileName: exportSubscribersConsumptionService.inputs.setFileName,
  });

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
