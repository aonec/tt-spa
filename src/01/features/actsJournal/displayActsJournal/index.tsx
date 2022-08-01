import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Space } from '../../../shared/ui/Layout/Space/Space';
import { AddNewActForm } from './components/AddNewActForm';
import { ApartmentActsList } from './components/ApartmentActsList';
import { SearchForm } from './components/SearchForm';
import { TableHeader } from './components/TableHeader';
import {
  clearCreationActForms,
  createApartmentActFx,
} from './models';

export const ApartmentActs = () => {
  useEffect(
    () =>
      createApartmentActFx.doneData.watch(() =>
        setTimeout(clearCreationActForms, 200)
      ).unsubscribe,
    []
  );

  return (
    <Wrap>
      <SearchForm />
      <Space h={20} />
      <TableHeader />
      <Space />
      <AddNewActForm />
      <ApartmentActsList />
    </Wrap>
  );
};

const Wrap = styled.div`
  max-width: 1080px;
`;
