import React, { FC, useMemo } from 'react';
import { Wrapper } from './SortButton.styled';
import { SortButtonProps } from './SortButton.types';
import { EOrderByRule } from 'api/types';
import  SortIcon  from './assets/sortArrows.svg?react';
import  SortIconTop  from './assets/sortArrowsTop.svg?react';
import  SortIconBottom  from './assets/sortArrowsBottom.svg?react';

export const SortButton: FC<SortButtonProps> = ({
  onChange,
  value,
  className,
}) => {
  const handleChange = () => {
    if (!value) {
      return onChange(EOrderByRule.Ascending);
    } else if (value === EOrderByRule.Ascending) {
      return onChange(EOrderByRule.Descending);
    }
    return onChange(undefined);
  };

  const Icon = useMemo(() => {
    if (value === EOrderByRule.Ascending) {
      return SortIconTop;
    }
    if (value === EOrderByRule.Descending) {
      return SortIconBottom;
    }
    return SortIcon;
  }, [value]);

  return (
    <Wrapper className={className} onClick={handleChange}>
      <Icon />
    </Wrapper>
  );
};
