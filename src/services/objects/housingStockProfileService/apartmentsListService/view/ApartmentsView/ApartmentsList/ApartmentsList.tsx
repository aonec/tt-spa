import React, { FC, useEffect } from 'react';
import { ApartmentItem } from './ApartmentItem';
import { Wrapper } from './ApartmentsList.styled';
import { ApartmentsListProps } from './ApartmentsList.types';

export const ApartmentsList: FC<ApartmentsListProps> = ({
  apartments,
  hosuingStockId,
  setCurrentApartmentId,
  currentApartmentId,
  clearCurrentApartmentId,
}) => {
  useEffect(() => {
    if (!currentApartmentId) return;

    const apartmentNodeId = `apartment-list-item-${currentApartmentId}`;

    const node = document.getElementById(apartmentNodeId);

    if (!node) return;

    node.scrollIntoView({
      block: 'start',
      behavior: 'smooth',
    });

    clearCurrentApartmentId();
  }, [currentApartmentId, clearCurrentApartmentId]);

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
