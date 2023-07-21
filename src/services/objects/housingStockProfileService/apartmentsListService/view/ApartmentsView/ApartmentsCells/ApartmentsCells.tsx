import { ETasksState } from 'api/types';
import React, { FC } from 'react';
import { ApartmentCellItem } from './ApartmentCellItem';
import { CellsWrapper, LegendWrapper, Wrapper } from './ApartmentsCells.styled';
import { ApartmentsCellsProps } from './ApartmentsCells.types';
import { ApartmentStatusLegend } from './ApartmentStatusLegend';

export const ApartmentsCells: FC<ApartmentsCellsProps> = ({
  apartments,
  hosuingStockId,
}) => {
  return (
    <Wrapper>
      <LegendWrapper>
        <ApartmentStatusLegend status={ETasksState.OnTime} />
        <ApartmentStatusLegend status={ETasksState.MissedDeadline} />
      </LegendWrapper>
      <CellsWrapper>
        {apartments.map((apartment) => (
          <ApartmentCellItem
            hosuingStockId={hosuingStockId}
            key={apartment.id}
            apartment={apartment}
          />
        ))}
      </CellsWrapper>
    </Wrapper>
  );
};
