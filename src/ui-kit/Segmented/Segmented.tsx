import React from 'react';
import { SegmentItem, SegmentTitle, Wrapper } from './Segmented.styled';
import { SegmentedProps } from './Segmented.types';

export const Segmented = <T extends string>({
  items,
  onChange,
  active,
}: SegmentedProps<T>) => {
  return (
    <Wrapper>
      {items.map(({ title, icon, name }) => (
        <SegmentItem onClick={() => onChange(name)} isActive={active === name}>
          {icon}
          {title && <SegmentTitle>{title}</SegmentTitle>}
        </SegmentItem>
      ))}
    </Wrapper>
  );
};
