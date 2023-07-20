import React from 'react';
import { WithLoader } from 'ui-kit/shared/WithLoader';
import { displayStatisticsListByHousesService } from './displayStatisticsListByHousesService.model';
import { useUnit } from 'effector-react';
import { Empty } from 'antd';
import { TypeAddressToStart } from 'ui-kit/shared/TypeToStart';
import { ExportSubscribersConsumptionContainer } from '../exportSubscribersConsumptionService';
import { StatisticsList } from './view/StatisticsList';
import { SearchHousingStock } from './view/SearchHousingStock';

const { inputs, outputs } = displayStatisticsListByHousesService;

export const DisplayStatisticsListByHousesContainer = () => {
  const isLoading = useUnit(outputs.$isLoading);
  const filter = useUnit(outputs.$subscriberStatisticsByHouseFilter);
  const statistics = useUnit(outputs.$consumptionStatisticsByHouse);
  const housingStockId = useUnit(outputs.$selectedHousingStockId);
  const housingStockAddress = useUnit(outputs.$housingStockAddress);

  const setFilter = useUnit(inputs.setSubscriberStatisticsFilter);
  const setHousingStockAddress = useUnit(inputs.setHousingStockAddress);

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
