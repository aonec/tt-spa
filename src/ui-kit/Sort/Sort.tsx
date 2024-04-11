import React, { FC, useMemo } from 'react';
import { DescendingSortIconSC, Wrapper } from './Sort.styled';
import { Props } from './Sort.types';
import { EOrderByRule } from 'api/types';

export const Sort: FC<Props> = ({ handleChange, value }) => {
  const isDescending = useMemo(
    () => value === EOrderByRule.Descending,
    [value],
  );

  return (
    <Wrapper onClick={handleChange}>
      <DescendingSortIconSC isAscending={!isDescending} />
    </Wrapper>
  );
};
