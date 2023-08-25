import { Divider } from 'antd';
import React, { FC } from 'react';
import { GroupWrapper, Wrapper } from './AddressesList.styled';
import { AddressesListProps } from './AddressesList.types';
import { AddressesListItem } from './AddressesListItem';

export const AddressesList: FC<AddressesListProps> = ({ streets }) => {
  const list = streets.map((street) => {
    const [streetName, housingStocks] = street;
    return (
      <AddressesListItem
        key={streetName}
        street={streetName}
        housingStocks={housingStocks}
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
