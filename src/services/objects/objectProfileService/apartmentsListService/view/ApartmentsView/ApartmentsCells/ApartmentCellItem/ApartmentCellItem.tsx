import React, { FC } from 'react';
import { CellWrapper } from './ApartmentCellItem.styled';
import { ApartmentCellItemProps } from './ApartmentCellItem.types';

export const ApartmentCellItem: FC<ApartmentCellItemProps> = ({
  apartment,
  hosuingStockId,
}) => {
  return (
    <CellWrapper to={`/objects/${hosuingStockId}/apartments/${apartment.id}`}>
      {apartment.apartmentNumber}
    </CellWrapper>
  );
};
