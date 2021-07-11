import React from 'react';
import styled from 'reshadow/macro';
import { input } from '01/r_comp';

export const Filter = ({ inputs = [] }) => {
  return styled(input)`
    filter {
      grid-column: 1 / -1;
      display: grid;
      grid-template-columns:
        minmax(200px, 1fr)
        minmax(200px, 1fr)
        minmax(100px, 0.5fr)
        minmax(100px, 0.5fr)
        minmax(100px, 1fr);
      grid-gap: 16px;
    }
  `(
    <filter as="div">
      {inputs.map((input) => (
        <input_frame data-disabled={input.name === 'city'} key={input.name}>
          <input
            {...input}
            disabled={input.name === 'city'}
            onKeyDown={console.log}
          />
        </input_frame>
      ))}
    </filter>,
  );
};
