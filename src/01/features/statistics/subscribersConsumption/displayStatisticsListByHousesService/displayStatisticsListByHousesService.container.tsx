import React from 'react';
import { Search } from '../components/Search';
import { Space } from '01/shared/ui/Layout/Space/Space';
import { WithLoader } from 'ui-kit/shared_components/WithLoader';
import { ExportSubscribersConsumptionContainer } from '../exportSubscribersConsumptionService';
import { StatisticsList } from '../components/StatisticsList';
import { useStore } from 'effector-react';
import { subscribersConsumptionService } from '../models';
import { currentUserService } from 'services/currentUserService';
import { Empty } from 'antd';
import { TypeAddressToStart } from '01/shared/ui/TypeToStart';

const { outputs } = subscribersConsumptionService;

export const DisplayStatisticsListByHousesContainer = () => {
  const isLoading = useStore(outputs.$isLoading);
  const filter = useStore(outputs.$subscriberStatisticsFilter);
  const statistics = useStore(outputs.$consumptionStatistics);
  const currentUser = useStore(currentUserService.outputs.$currentUser);
  const apartmentId = useStore(outputs.$selectedHousingsStockId);

  const isHousingStockHasCorpuses = Boolean(
    currentUser?.organization?.filtersConfiguration?.hasHousingStockCorpuses,
  );
  const isStatisticsExist = Boolean(statistics.length);
  const isApartmentExist = Boolean(apartmentId);

  return (
    <>
      <Search isHousingStockHasCorpuses={isHousingStockHasCorpuses} />
      <Space />
      <WithLoader isLoading={isLoading}>
        <ExportSubscribersConsumptionContainer filter={filter} />
        {isStatisticsExist && isApartmentExist && (
          <StatisticsList statistics={statistics} />
        )}
        {!isStatisticsExist && isApartmentExist && (
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
        )}
        {!isApartmentExist && <TypeAddressToStart />}
      </WithLoader>
    </>
  );
};
