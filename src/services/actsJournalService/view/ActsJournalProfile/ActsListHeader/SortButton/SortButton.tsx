import React, { FC } from 'react';
import { Wrapper } from './SortButton.styled';
import { SortButtonProps } from './SortButton.types';
import { EOrderByRule } from 'myApi';
import { ReactComponent as SortIcon } from './assets/sortArrows.svg';
import { ReactComponent as SortIconTop } from './assets/sortArrowsTop.svg';
import { ReactComponent as SortIconBottom } from './assets/sortArrowsBottom.svg';

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

  const Icon =
    value === undefined
      ? SortIcon
      : value === EOrderByRule.Ascending
      ? SortIconTop
      : SortIconBottom;

  return (
    <Wrapper className={className} onClick={handleChange}>
      <Icon />
    </Wrapper>
  );
};
