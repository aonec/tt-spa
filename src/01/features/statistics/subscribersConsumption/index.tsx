import { Space } from '01/shared/ui/Layout/Space/Space';
import React from 'react';
import styled from 'styled-components';
import { Search } from './components/Search';
import { StatisticsList } from './components/StatisticsList';

export const SubscribersConsumption = () => (
  <Wrap>
    <Search />
    <Space />
    <StatisticsList />
  </Wrap>
);

const Wrap = styled.div`
  max-width: 960px;
  margin: 5px 0px 10px 0px;
`;
