import React from 'react';
import { ItemPanel, Wrapper } from './ItemPanelsSelect.styled';
import { ItemPanelsSelectProps } from './ItemPanelsSelect.types';

export function ItemPanelsSelect<T extends string | null>({
  items,
  selected,
  onChange,
}: ItemPanelsSelectProps<T>) {
  function handleChange(value: T) {
    const isArray = Array.isArray(selected);

    if (!isArray) {
      onChange?.(value === selected ? null : value);
      return;
    }

    const isItemSelected = selected.includes(value);

    if (!isItemSelected) {
      onChange?.([...selected, value]);
      return;
    }

    onChange?.(selected.filter((key) => key !== value));
  }

  return (
    <Wrapper>
      {items.map(({ key, title, icon }) => (
        <ItemPanel
          key={key}
          isSelected={
            Array.isArray(selected) ? selected.includes(key) : key === selected
          }
          onClick={() => handleChange(key)}
        >
          {icon}
          <div>{title}</div>
        </ItemPanel>
      ))}
    </Wrapper>
  );
}
