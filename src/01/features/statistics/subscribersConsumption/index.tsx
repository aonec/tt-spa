import { Space } from '01/shared/ui/Layout/Space/Space';
import React, { ReactNode, useMemo } from 'react';
import styled from 'styled-components';
import { Search } from './components/Search';
import { StatisticsList } from './components/StatisticsList';
import { Link, useParams } from 'react-router-dom';
import { Radio } from 'antd';
import { SubscribersConsumptionSearchType } from './subscribersConsumption.types';
import { DisplayStatisticsListByManagingFirmContainer } from './displayStatisticsListByManagingFirmService';
import { useStore } from 'effector-react';
import { currentUserService } from 'services/currentUserService';

export const SubscribersConsumption = () => {
  const { searchType } = useParams<{ searchType: string }>();

  const currentUser = useStore(currentUserService.outputs.$currentUser);
  const isHousingStockHasCorpuses = Boolean(
    currentUser?.organization?.filtersConfiguration?.hasHousingStockCorpuses,
  );

  const subscribersConsumptionListComponentsLookup: {
    [key: string]: ReactNode;
  } = useMemo(
    () => ({
      [SubscribersConsumptionSearchType.Houses]: (
        <>
          {isHousingStockHasCorpuses && <Search isHousingStockHasCorpuses />}
          {!isHousingStockHasCorpuses && (
            <Search isHousingStockHasCorpuses={false} />
          )}
          <Space />
          <StatisticsList />
        </>
      ),
      [SubscribersConsumptionSearchType.ManagingFirm]: (
        <DisplayStatisticsListByManagingFirmContainer />
      ),
    }),
    [isHousingStockHasCorpuses],
  );

  const subscribersConsumptionComponent = useMemo(() => {
    if (!searchType) return null;

    const Component = subscribersConsumptionListComponentsLookup[searchType];

    if (!Component) return null;

    return Component;
  }, [searchType, subscribersConsumptionListComponentsLookup]);

  return (
    <Wrap>
      <Radio.Group value={searchType}>
        <Link
          to={`/statistics/subscribersConsumption/${SubscribersConsumptionSearchType.Houses}`}
        >
          <Radio value={SubscribersConsumptionSearchType.Houses}>
            Поиск по адресу
          </Radio>
        </Link>
        <Link
          to={`/statistics/subscribersConsumption/${SubscribersConsumptionSearchType.ManagingFirm}`}
        >
          <Radio value={SubscribersConsumptionSearchType.ManagingFirm}>
            Поиск по домоуправлениям
          </Radio>
        </Link>
      </Radio.Group>
      {subscribersConsumptionComponent}
    </Wrap>
  );
};

const Wrap = styled.div`
  max-width: 960px;
  margin: 5px 0px 10px 0px;
`;
