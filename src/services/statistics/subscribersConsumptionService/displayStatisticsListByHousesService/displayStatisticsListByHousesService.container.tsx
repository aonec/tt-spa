import React from 'react';
import { WithLoader } from 'ui-kit/shared/WithLoader';
import { displayStatisticsListByHousesService } from './displayStatisticsListByHousesService.model';
import { useUnit } from 'effector-react';
import { Empty } from 'antd';
import { TypeAddressToStart } from 'ui-kit/shared/TypeToStart';
import { ExportSubscribersConsumptionContainer } from '../exportSubscribersConsumptionService';
import { StatisticsList } from './view/StatisticsList';
import { SearchHousingStock } from './view/SearchHousingStock';
import { fetchHousingStockIdQuery } from './displayStatisticsListByHousesService.api';
import { NothingFound } from 'ui-kit/shared/NothingFound';

const { inputs, outputs, gates } = displayStatisticsListByHousesService;
const { StatisticsByHouseGate } = gates;

export const DisplayStatisticsListByHousesContainer = () => {
  const {
    filter,
    housingStockAddress,
    housingStockId,
    isLoading,
    setFilter,
    setHousingStockAddress,
    statistics,
    isBuildingFetched,
  } = useUnit({
    isLoading: outputs.$isLoading,
    filter: outputs.$subscriberStatisticsByHouseFilter,
    statistics: outputs.$consumptionStatisticsByHouse,
    housingStockId: outputs.$selectedHousingStockId,
    housingStockAddress: outputs.$housingStockAddress,
    setFilter: inputs.setSubscriberStatisticsFilter,
    setHousingStockAddress: inputs.setHousingStockAddress,
    isBuildingFetched: fetchHousingStockIdQuery.$succeeded,
  });

  const isStatisticsExist = Boolean(statistics.length);
  const isHousingStockExist = Boolean(housingStockId);

  return (
    <>
      <StatisticsByHouseGate />
      <ExportSubscribersConsumptionContainer filter={filter} />
      <SearchHousingStock
        filter={filter}
        setFilter={setFilter}
        housingStockAddress={housingStockAddress}
        setHousingStockAddress={setHousingStockAddress}
        isNothingFound={isBuildingFetched && !isHousingStockExist}
      />
      <WithLoader isLoading={isLoading}>
        {isBuildingFetched && !isHousingStockExist && <NothingFound />}
        {!isBuildingFetched && !isHousingStockExist && <TypeAddressToStart />}
        {isHousingStockExist && (
          <>
            {isStatisticsExist && <StatisticsList statistics={statistics} />}
            {!isStatisticsExist && (
              <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
            )}
          </>
        )}
      </WithLoader>
    </>
  );
};
