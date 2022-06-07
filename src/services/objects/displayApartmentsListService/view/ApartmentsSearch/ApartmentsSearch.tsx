import { ExtendedSearch } from '01/shared/ui/ExtendedSearch';
import React, { FC } from 'react';
import { AddressSearchContainer } from 'services/addressSearchService';
import { SearchFieldType } from 'services/addressSearchService/view/AddressSearch/AddressSearch.types';
import { Wrapper } from './ApartmentsSearch.styled';
import { ApartmentsSearchProps } from './ApartmentsSearch.types';

export const ApartmentsSearch: FC<ApartmentsSearchProps> = ({
  handleSearch,
}) => {
  return (
    <Wrapper>
      <ExtendedSearch>
        <AddressSearchContainer
          fields={[
            SearchFieldType.City,
            SearchFieldType.Street,
            SearchFieldType.House,
            SearchFieldType.Corpus,
            SearchFieldType.Apartment,
          ]}
          handleSubmit={handleSearch}
        />
      </ExtendedSearch>
    </Wrapper>
  );
};
