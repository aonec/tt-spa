import React from 'react';
import { WithLoader } from 'ui-kit/shared_components/WithLoader';
import { displayStatisticsListByHousesService } from './displayStatisticsListByHousesService.model';
import { useEvent, useStore } from 'effector-react';
import { Empty } from 'antd';
import { TypeAddressToStart } from 'ui-kit/shared_components/TypeToStart';
import { ExportSubscribersConsumptionContainer } from '../exportSubscribersConsumptionService';
import { StatisticsList } from './view/StatisticsList';
import { SearchHousingStock } from './view/SearchHousingStock';

const { inputs, outputs } = displayStatisticsListByHousesService;

export const DisplayStatisticsListByHousesContainer = () => {
  const isLoading = useStore(outputs.$isLoading);
  const filter = useStore(outputs.$subscriberStatisticsByHouseFilter);
  const statistics = useStore(outputs.$consumptionStatisticsByHouse);
  const housingStockId = useStore(outputs.$selectedHousingStockId);
  const housingStockAddress = useStore(outputs.$housingStockAddress);

  const setFilter = useEvent(inputs.setSubscriberStatisticsFilter);
  const setHousingStockAddress = useEvent(inputs.setHousingStockAddress);

  const isStatisticsExist = Boolean(statistics.length);
  const isHousingStockExist = Boolean(housingStockId);

  return (
    <>
      <ExportSubscribersConsumptionContainer filter={filter} />
      <SearchHousingStock
        filter={filter}
        setFilter={setFilter}
        housingStockAddress={housingStockAddress}
        setHousingStockAddress={setHousingStockAddress}
      />
      <WithLoader isLoading={isLoading}>
        {isStatisticsExist && isHousingStockExist && (
          <StatisticsList statistics={statistics} />
        )}
        {!isStatisticsExist && isHousingStockExist && (
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
        )}
        {!isHousingStockExist && <TypeAddressToStart />}
      </WithLoader>
    </>
  );
};
