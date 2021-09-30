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
  margin: 5px 15px 10px 15px;
`;
