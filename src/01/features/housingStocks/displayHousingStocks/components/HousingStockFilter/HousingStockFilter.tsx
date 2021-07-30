import { input } from '01/r_comp';
import React from 'react';
import styled from 'reshadow/macro';
import { useFilter } from './useFilter.hook';

export const HousingStockFilter = () => {
  const { filterFields, setValue } = useFilter();

  return styled(input)`
    filter {
      margin-bottom: 15px;
      margin-right: 10px;
      grid-column: 1 / -1;
      display: grid;
      grid-template-columns:
        minmax(100px, 1fr)
        minmax(100px, 2fr)
        minmax(100px, 0.5fr)
        minmax(100px, 0.5fr);
      grid-gap: 16px;
    }
  `(
    <filter as="div">
      {filterFields?.map((field) => (
        <input_frame key={field.name}>
          <input
            key={field.name}
            value={field.value}
            onChange={(e) => setValue(field.name, e.target.value)}
            type="text"
            placeholder={field.placeholder}
          />
        </input_frame>
      ))}
    </filter>
  );
};
