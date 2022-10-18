import React, { FC } from 'react';
import { ApartmentTaskStatusNamesLookup } from './ApartmentStatusLegend.constants';
import { StatusCircle, Text, Wrapper } from './ApartmentStatusLegend.styled';
import { ApartmentStatusLegendProps } from './ApartmentStatusLegend.types';

export const ApartmentStatusLegend: FC<ApartmentStatusLegendProps> = ({
  status,
}) => {
  return (
    <Wrapper>
      <StatusCircle status={status} />
      <Text>{ApartmentTaskStatusNamesLookup[status]}</Text>
    </Wrapper>
  );
};
