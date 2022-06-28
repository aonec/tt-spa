import { ExtendedSearch } from '01/shared/ui/ExtendedSearch';
import React, { FC } from 'react';
import { AddressSearchContainer } from 'services/addressSearchService';
import { SearchFieldType } from 'services/addressSearchService/view/AddressSearch/AddressSearch.types';
import { Wrapper } from './SearchObjects.styled';
import { SearchObjectsProps } from './SearchObjects.types';

const fields = [
  SearchFieldType.City,
  SearchFieldType.Street,
  SearchFieldType.House,
  SearchFieldType.Corpus,
];

export const SearchObjects: FC<SearchObjectsProps> = ({ handleSearch }) => {
  return (
    <Wrapper>
      <ExtendedSearch
        isOpen={false}
        handleApply={() => {}}
        handleClear={() => {}}
        handleClose={() => {}}
        handleOpen={() => {}}
        extendedSearchContent={<></>}
        disabled
      >
        <AddressSearchContainer handleSubmit={handleSearch} fields={fields} />
      </ExtendedSearch>
    </Wrapper>
  );
};
