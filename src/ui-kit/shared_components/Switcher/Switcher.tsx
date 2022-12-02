import React, { FC } from 'react';
import { ChevronRight } from 'react-bootstrap-icons';
import { ChevronLeft, SwitcherText, SwitcherWrapper } from './Switcher.styled';
import { SwitcherProps } from './Switcher.types';

export function Switcher<T>({
  nextValue,
  previousValue,
  textConstructor,
  handleClick,
}: SwitcherProps<T>) {
  return (
    <SwitcherWrapper>
      {previousValue && (
        <SwitcherText onClick={() => handleClick(previousValue)}>
          <ChevronLeft />
          {textConstructor(previousValue)}
        </SwitcherText>
      )}
      {nextValue && (
        <SwitcherText onClick={() => handleClick(nextValue)}>
          {textConstructor(nextValue)}
          <ChevronRight />
        </SwitcherText>
      )}
    </SwitcherWrapper>
  );
}
