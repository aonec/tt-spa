import React, { FC } from 'react';
import {
  NumbersWrapper,
  StreetNameWrapper,
  Wrapper,
} from './AddressesListItem.styled';
import { AddressesListItemProps } from './AddressesListItem.types';

export const AddressesListItem: FC<AddressesListItemProps> = ({
  housingStocks,
  street,
}) => {
  const housingStocksNumber = housingStocks.reduce((acc, address) => {
    const number = address.address?.mainAddress?.number;
    if (!number) {
      return acc;
    }
    return [...acc, number];
  }, [] as string[]);

  return (
    <Wrapper>
      <StreetNameWrapper>ул. {street}</StreetNameWrapper>
      <NumbersWrapper>{housingStocksNumber.join(', ')}</NumbersWrapper>
    </Wrapper>
  );
};
