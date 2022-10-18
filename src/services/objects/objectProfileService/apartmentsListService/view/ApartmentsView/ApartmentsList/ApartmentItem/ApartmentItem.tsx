import React, { FC } from 'react';
import { ApartmentNumberWrapper, Wrapper } from './ApartmentItem.styled';
import { ApartmentItemProps } from './ApartmentItem.types';

export const ApartmentItem: FC<ApartmentItemProps> = ({ apartment }) => {
  return (
    <Wrapper>
      <ApartmentNumberWrapper>
        №{apartment.apartmentNumber}
      </ApartmentNumberWrapper>
      <div>{apartment.homeownerName}</div>
      <div>{apartment.personalAccountNumber}</div>
      <div>{apartment.square && `${apartment.square} м²`}</div>
    </Wrapper>
  );
};
