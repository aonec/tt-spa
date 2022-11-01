import { ExtendedSearch } from '01/shared/ui/ExtendedSearch';
import React, { FC } from 'react';
import { AddressSearchContainer } from 'services/addressSearchService';
import { SearchFieldType } from 'services/addressSearchService/view/AddressSearch/AddressSearch.types';
import { Wrapper } from './IndividualDevicesAddressSearch.styled';
import { IndividualDevicesAddressSearchProps } from './IndividualDevicesAddressSearch.types';

export const IndividualDevicesAddressSearch: FC<IndividualDevicesAddressSearchProps> = ({}) => {
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
          handleSubmit={console.log}
        />
      </ExtendedSearch>
    </Wrapper>
  );
};
