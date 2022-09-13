import { Space } from '01/shared/ui/Layout/Space/Space';
import React, { ReactNode, useEffect, useMemo } from 'react';
import styled from 'styled-components';
import { useEvent, useStore } from '../../../../../node_modules/effector-react';
import { Search } from './components/Search';
import { StatisticsList } from './components/StatisticsList';
import { $selectedHousingsStockId } from './models';
import { useForm } from 'effector-forms';
import { Link, useParams } from 'react-router-dom';
import { Radio } from 'antd';
import { SubscribersConsumptionSearchType } from './subscribersConsumption.types';
import { DisplayStatisticsListByManagingFirmContainer } from './displayStatisticsListByManagingFirmService';

const subscribersConsumptionListComponentsLookup: {
  [key: string]: ReactNode;
} = {
  [SubscribersConsumptionSearchType.Houses]: (
    <>
      <Search />
      <Space />
      <StatisticsList />
    </>
  ),
  [SubscribersConsumptionSearchType.ManagingFirm]: (
    <DisplayStatisticsListByManagingFirmContainer />
  ),
};

export const SubscribersConsumption = () => {
  const { searchType } = useParams<{ searchType: string }>();

  const subscribersConsumptionComponent = useMemo(() => {
    if (!searchType) return null;

    const Component = subscribersConsumptionListComponentsLookup[searchType];

    if (!Component) return null;

    return Component;
  }, [searchType]);

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
