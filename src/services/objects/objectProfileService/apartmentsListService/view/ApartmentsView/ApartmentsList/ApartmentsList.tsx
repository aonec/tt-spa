import React, { FC } from 'react';
import { ApartmentItem } from './ApartmentItem';
import { Wrapper } from './ApartmentsList.styled';
import { ApartmentsListProps } from './ApartmentsList.types';

export const ApartmentsList: FC<ApartmentsListProps> = ({ apartments }) => {
  return (
    <Wrapper>
      {apartments.map((apartment) => (
        <ApartmentItem apartment={apartment} />
      ))}
    </Wrapper>
  );
};
