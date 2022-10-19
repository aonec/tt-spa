import React, { FC } from 'react';
import { ApartmentItem } from './ApartmentItem';
import { Wrapper } from './ApartmentsList.styled';
import { ApartmentsListProps } from './ApartmentsList.types';

export const ApartmentsList: FC<ApartmentsListProps> = ({
  apartments,
  hosuingStockId,
  setCurrentApartmentId,
}) => {
  return (
    <Wrapper>
      {apartments.map((apartment) => (
        <ApartmentItem
          hosuingStockId={hosuingStockId}
          key={apartment.id}
          apartment={apartment}
          setCurrentApartmentId={setCurrentApartmentId}
        />
      ))}
    </Wrapper>
  );
};
