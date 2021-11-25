import { Space } from '01/shared/ui/Layout/Space/Space';
import React from 'react';
import styled from 'styled-components';
import { SearchForm } from './components/SearchForm';
import { TableHeader } from './components/TableHeader';

export const ApartmentActs = () => {
  return (
    <Wrap>
      <SearchForm />
      <Space h={20} />
      <TableHeader />
    </Wrap>
  );
};

const Wrap = styled.div`
  max-width: 1080px;
`;
