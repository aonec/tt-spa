import { Divider } from 'antd';
import React, { FC } from 'react';
import { GroupWrapper, Wrapper } from './AddressesList.styled';
import { AddressesListProps } from './AddressesList.types';
import { AddressesListItem } from './AddressesListItem';

export const AddressesList: FC<AddressesListProps> = ({ streets }) => {
  const list = streets.map((street) => {
    const { addresses, street: streetName } = street;

    if (!streetName) {
      return null;
    }

    return (
      <AddressesListItem
        key={streetName}
        street={streetName}
        addresses={addresses}
      />
    );
  });

  return (
    <>
      <Wrapper>
        <GroupWrapper>
          <div> Улица</div>
          <Divider type="vertical" />
        </GroupWrapper>
        <GroupWrapper>
          <div>Номера домов</div>
        </GroupWrapper>
      </Wrapper>
      {list}
    </>
  );
};
