import React, { FC } from 'react';
import { Wrapper } from './ApartmentProfile.styled';
import { ApartmentProfileProps } from './ApartmentProfile.types';
import { AddressSearchContainer } from 'services/addressSearchService';
import { SearchFieldType } from 'services/addressSearchService/view/AddressSearch/AddressSearch.types';

export const ApartmentProfile: FC<ApartmentProfileProps> = ({}) => {
  return (
    <Wrapper>
      <AddressSearchContainer
        fields={[
          SearchFieldType.City,
          SearchFieldType.Street,
          SearchFieldType.Apartment,
          SearchFieldType.House,
          SearchFieldType.Question,
        ]}
      />
    </Wrapper>
  );
};
