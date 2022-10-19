import React, { FC } from 'react';
import { TasksStateNamesLookup } from './ApartmentStatusLegend.constants';
import { StatusCircle, Text, Wrapper } from './ApartmentStatusLegend.styled';
import { ApartmentStatusLegendProps } from './ApartmentStatusLegend.types';

export const ApartmentStatusLegend: FC<ApartmentStatusLegendProps> = ({
  status,
}) => {
  return (
    <Wrapper>
      <StatusCircle status={status} />
      <Text>{TasksStateNamesLookup[status]}</Text>
    </Wrapper>
  );
};
