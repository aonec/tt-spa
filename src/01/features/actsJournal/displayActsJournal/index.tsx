import { Space } from '01/shared/ui/Layout/Space/Space';
import { useEvent, useStore } from 'effector-react';
import React, { useEffect } from 'react';
import styled from 'styled-components';
import { AddNewActForm } from './components/AddNewActForm/AddNewActForm';
import { ApartmentActsList } from './components/ApartmentActsList';
import { SearchForm } from './components/SearchForm';
import { TableHeader } from './components/TableHeader';
import {
  $selectedActType,
  $selectedResourceType,
  clearCreationActForms,
  createApartmentAct,
  createApartmentActFx,
  selectActType,
  selectResourceType,
} from './models';

export const ApartmentActs = () => {
  const selectedActType = useStore($selectedActType);
  const selectedResourceType = useStore($selectedResourceType);

  const selectAct = useEvent(selectActType);
  const selectResource = useEvent(selectResourceType);
  const createAct = useEvent(createApartmentAct);
  const clearForm = useEvent(clearCreationActForms);

  return (
    <Wrap>
      <SearchForm />
      <Space h={20} />
      <TableHeader />
      <Space />
      <AddNewActForm
        addNewAct={createAct}
        selectAct={selectAct}
        selectResource={selectResource}
        selectedActType={selectedActType}
        selectedResourceType={selectedResourceType}
        clearForm={() => clearForm()}
      />
      <ApartmentActsList />
    </Wrap>
  );
};

const Wrap = styled.div`
  max-width: 1080px;
`;
