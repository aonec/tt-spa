import { ExtendedSearch } from '01/shared/ui/ExtendedSearch';
import React, { FC } from 'react';
import { AddressSearchContainer } from 'services/addressSearchService';
import { SearchFieldType } from 'services/addressSearchService/view/AddressSearch/AddressSearch.types';
import { Wrapper } from './ApartmentsSearch.styled';
import { ApartmentsSearchProps } from './ApartmentsSearch.types';

export const ApartmentsSearch: FC<ApartmentsSearchProps> = ({}) => {
  return (
    <Wrapper>
      <ExtendedSearch>
        <AddressSearchContainer
          lastField={SearchFieldType.Apartment}
          handleSubmit={() => {}}
        />
      </ExtendedSearch>
    </Wrapper>
  );
};
