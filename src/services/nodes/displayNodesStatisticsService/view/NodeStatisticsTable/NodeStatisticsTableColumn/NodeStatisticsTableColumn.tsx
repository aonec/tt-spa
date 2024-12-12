import React from 'react';
import {
  TitleWrapper,
  ValueWrapper,
  Wrapper,
} from './NodeStatisticsTableColumn.styled';
import { NodeStatisticsTableColumnProps } from './NodeStatisticsTableColumn.types';

export function NodeStatisticsTableColumn<T>({
  title,
  values,
  valueConstructor,
}: NodeStatisticsTableColumnProps<T>) {
  return (
    <Wrapper>
      <TitleWrapper>{title}</TitleWrapper>
      {values.map((value) => {
        if (value === undefined) {
          return <ValueWrapper key="minus">-</ValueWrapper>;
        }
        return (
          <ValueWrapper key="value">{valueConstructor(value)}</ValueWrapper>
        );
      })}
    </Wrapper>
  );
}
