import { ExtendedSearch } from '01/shared/ui/ExtendedSearch';
import React, { FC } from 'react';
import { AddressSearchContainer } from 'services/addressSearchService';
import { SearchFieldType } from 'services/addressSearchService/view/AddressSearch/AddressSearch.types';
import { Wrapper } from './SearchObjects.styled';
import { SearchObjectsProps } from './SearchObjects.types';

export const SearchObjects: FC<SearchObjectsProps> = ({}) => {
  return (
    <Wrapper>
      <ExtendedSearch>
        <AddressSearchContainer
          handleSubmit={console.log}
          lastField={SearchFieldType.Corpus}
        />
      </ExtendedSearch>
    </Wrapper>
  );
};
