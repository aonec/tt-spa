import React, { FC } from 'react';
import { AddressSearchContainer } from 'services/addressSearchService';
import { SearchFieldType } from 'services/addressSearchService/view/AddressSearch/AddressSearch.types';
import { DevicesSearchType } from 'services/devices/devicesPageService/individualDevicesProfileService/individualDevicesProfileService.types';
import { IndividualDevicesExtendedSearch } from '../../../IndividualDevicesExtendedSearch';
import { Wrapper } from './IndividualDevicesAddressSearch.styled';
import { IndividualDevicesAddressSearchProps } from './IndividualDevicesAddressSearch.types';

export const IndividualDevicesAddressSearch: FC<IndividualDevicesAddressSearchProps> = ({}) => {
  return (
    <Wrapper>
      <IndividualDevicesExtendedSearch
        devicesSearchType={DevicesSearchType.Address}
      >
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
      </IndividualDevicesExtendedSearch>
    </Wrapper>
  );
};
