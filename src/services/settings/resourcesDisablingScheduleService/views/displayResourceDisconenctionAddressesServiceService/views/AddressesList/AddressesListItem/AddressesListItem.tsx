import React, { FC } from 'react';
import {
  NumbersWrapper,
  StreetNameWrapper,
  Wrapper,
} from './AddressesListItem.styled';
import { AddressesListItemProps } from './AddressesListItem.types';

export const AddressesListItem: FC<AddressesListItemProps> = ({
  street,
  addresses,
}) => {
  const housingStocksNumber = addresses.reduce((acc, address) => {
    const number = address.number;
    const corpus = address.corpus;

    if (!number) {
      return acc;
    }
    const addressText = corpus ? `${number} к.${corpus}` : number;

    return [...acc, addressText];
  }, [] as string[]);

  return (
    <Wrapper>
      <StreetNameWrapper>ул. {street}</StreetNameWrapper>
      <NumbersWrapper>{housingStocksNumber.join(', ')}</NumbersWrapper>
    </Wrapper>
  );
};
