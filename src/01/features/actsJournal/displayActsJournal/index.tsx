import { Space } from '01/shared/ui/Layout/Space/Space';
import React, { useEffect } from 'react';
import styled from 'styled-components';
import { AddNewActForm } from './components/AddNewActForm';
import { ApartmentActsList } from './components/ApartmentActsList';
import { SearchForm } from './components/SearchForm';
import { TableHeader } from './components/TableHeader';
import {
  clearCreationActForms,
  createApartmentActFx,
  ActJournalGate,
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
      <ActJournalGate />
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
