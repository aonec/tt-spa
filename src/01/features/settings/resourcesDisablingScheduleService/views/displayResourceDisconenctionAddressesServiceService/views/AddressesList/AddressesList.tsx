import { Divider } from 'antd';
import React, { FC } from 'react';
import { GroupWrapper, Wrapper } from './AddressesList.styled';
import { AddressesListProps } from './AddressesList.types';
import { AddressesListItem } from './AddressesListItem';

export const AddressesList: FC<AddressesListProps> = ({ streets }) => {
  const list = streets.map((street) => (
    <AddressesListItem
      key={street[0]}
      street={street[0]}
      housingStocks={street[1]}
    />
  ));

  return (
    <>
      <Wrapper>
        <GroupWrapper>
          <div> Улица</div> <Divider type="vertical" />
        </GroupWrapper>
        <GroupWrapper>
          <div>Номер домов</div>
        </GroupWrapper>
      </Wrapper>
      {list}
    </>
  );
};
