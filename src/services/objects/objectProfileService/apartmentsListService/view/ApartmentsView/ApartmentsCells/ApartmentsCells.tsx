import React, { FC } from 'react';
import { LegendWrapper } from './ApartmentsCells.styled';
import { ApartmentsCellsProps } from './ApartmentsCells.types';
import { ApartmentStatusLegend } from './ApartmentStatusLegend';

export const ApartmentsCells: FC<ApartmentsCellsProps> = ({ apartments }) => {
  return (
    <div>
      <LegendWrapper>
        <ApartmentStatusLegend status="Performed" />
        <ApartmentStatusLegend status="Overdue" />
      </LegendWrapper>
    </div>
  );
};
