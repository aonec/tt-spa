import React, { FC } from 'react';
import { Wrapper } from './AddressHeader.styled';
import { AddressHeaderProps } from './AddressHeader.types';

export const AddressHeader: FC<AddressHeaderProps> = ({ housingsByFilter }) => {
  const address = housingsByFilter.current?.address;

  return (
    <Wrapper>
      {address?.city}, ул. {address?.street} {address?.houseNumber}
      {address?.houseCorpus}
    </Wrapper>
  );
};
