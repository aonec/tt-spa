import React from 'react';
import {
  ChevronLeft,
  SwitcherText,
  SwitcherWrapper,
  ChevronRight,
} from './Switcher.styled';
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
