import { ExistingCitiesGate } from '01/features/housingStocks/displayHousingStockCities/models';
import { Skeleton } from 'antd';
import { useEvent, useStore } from 'effector-react';
import React from 'react';
import { $isExpandedSearchOpen, openExpandedSearch } from '../models';
import { useFilterStatisticsList } from './displayStatisticsListByManagingFirmService.hooks';
import { displayStatisticsListByManagingFirmService } from './displayStatisticsListByManagingFirmService.model';
import { HousingStocksList } from './view/HousingStocksList';
import { ManagingFirmSearch } from './view/ManagingFirmSearch';

const { gates, outputs, inputs } = displayStatisticsListByManagingFirmService;
const { StatiscticsPageGate } = gates;

export const DisplayStatisticsListByManagingFirmContainer = () => {
  const cities = useStore(outputs.$cities);
  const managingFirms = useStore(outputs.$managingFirms);
  const selectedManagingFirm = useStore(outputs.$selectedManagingFirm);
  const selectedCity = useStore(outputs.$selectedCity);
  const housingStocks = useStore(outputs.$housingStocks);
  const housingStocksIsLoading = useStore(outputs.$housingStocksIsLoading);
  const isOpenExpandedSearch = useStore($isExpandedSearchOpen);
  const statisticIsLoading = useStore(outputs.$statisticIsLoading);

  const selectCity = useEvent(inputs.selectCity);
  const selectManagingFirm = useEvent(inputs.selectManagingFirm);
  const selectHousingStock = useEvent(inputs.selectHousingStock);
  const handleOpenExpandedSearch = useEvent(openExpandedSearch);

  const filteredHousingStocks = useFilterStatisticsList(housingStocks);

  return (
    <>
      <ExistingCitiesGate />
      <StatiscticsPageGate />
      <ManagingFirmSearch
        cities={cities || []}
        managingFirms={managingFirms}
        selectedManagingFirm={selectedManagingFirm}
        selectManagingFirm={selectManagingFirm}
        selectedCity={selectedCity}
        selectCity={selectCity}
        isOpenExpandedSearch={isOpenExpandedSearch}
        handleOpenExpandedSearch={() => handleOpenExpandedSearch()}
      />
      {housingStocksIsLoading && <Skeleton active />}
      {!housingStocksIsLoading && (
        <HousingStocksList
          housingStocks={filteredHousingStocks}
          selectHousingStock={selectHousingStock}
          statisticIsLoading={statisticIsLoading}
        />
      )}
    </>
  );
};
