import React from 'react';
import styled from 'styled-components';
import { Search } from './components/Search';

export const SubscribersConsumption = () => (
  <Wrap>
    <Search />
  </Wrap>
);

const Wrap = styled.div`
  max-width: 960px;
  margin-left: 10px;
  margin-bottom: 10px;
  transform: translateX(-10px);
`;
