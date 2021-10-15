import { Space } from '01/shared/ui/Layout/Space/Space';
import React from 'react';
import styled from 'styled-components';
import { useStore } from '../../../../../node_modules/effector-react';
import { Search } from './components/Search';
import { StatisticsList } from './components/StatisticsList';
import { $selectedHousingsStockId, ConsumptionStatisticsGate } from './models';

export const SubscribersConsumption = () => {
  const id = useStore($selectedHousingsStockId);
  return (
    <Wrap>
      {id && <ConsumptionStatisticsGate housingStockId={id} />}
      <Search />
      <Space />
      <StatisticsList />
    </Wrap>
  );
};

const Wrap = styled.div`
  max-width: 960px;
  margin: 5px 0px 10px 0px;
`;
