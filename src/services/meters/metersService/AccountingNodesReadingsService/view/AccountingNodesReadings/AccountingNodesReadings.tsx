import React, { FC } from 'react';
import { Wrapper } from './AccountingNodesReadings.styled';
import { AccountingNodesReadingsProps } from './AccountingNodesReadings.types';
import { AddressSearchContainer } from 'services/addressSearchService';
import { SearchFieldType } from 'services/addressSearchService/view/AddressSearch/AddressSearch.types';

export const AccountingNodesReadings: FC<
  AccountingNodesReadingsProps
> = ({}) => {
  return (
    <Wrapper>
      <AddressSearchContainer
        fields={[
          SearchFieldType.City,
          SearchFieldType.Street,
          SearchFieldType.House,
        ]}
        handleSubmit={handleSubmit}
        initialValues={
          address && {
            city: address.city || undefined,
            street: address.street || undefined,
            house: address.number || undefined,
          }
        }
      />
    </Wrapper>
  );
};
