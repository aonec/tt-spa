import { ExtendedSearch } from '01/shared/ui/ExtendedSearch';
import React, { FC } from 'react';
import { AddressSearchContainer } from 'services/addressSearchService';
import { SearchFieldType } from 'services/addressSearchService/view/AddressSearch/AddressSearch.types';
import { Wrapper } from './SearchObjects.styled';
import { SearchObjectsProps } from './SearchObjects.types';

export const SearchObjects: FC<SearchObjectsProps> = ({ handleSearch }) => {
  return (
    <Wrapper>
      <ExtendedSearch>
        <AddressSearchContainer
          handleSubmit={handleSearch}
          fields={[
            SearchFieldType.City,
            SearchFieldType.Street,
            SearchFieldType.House,
            SearchFieldType.Corpus,
          ]}
        />
      </ExtendedSearch>
    </Wrapper>
  );
};
