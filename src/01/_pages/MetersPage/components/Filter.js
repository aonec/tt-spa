import React, { useRef } from 'react';
import styled from 'reshadow/macro';
import { input } from '01/r_comp';
import { getArrayByCountRange } from './utils';

export const Filter = ({ inputs = [] }) => {
  const inputsRefs = getArrayByCountRange(inputs.length, useRef);

  const onInputKeyPress = (e, index) => {
    if (e.key !== 'Enter') return;

    const neededRef = inputsRefs[index + 1];

    if (!neededRef) return;

    neededRef.current.focus();
  };

  return styled(input)`
    filter {
      margin-bottom: 15px;
      margin-right: 10px;
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
      {inputs.map((input, index) => (
        <input_frame data-disabled={input.name === 'city'} key={input.name}>
          <input
            ref={inputsRefs[index]}
            {...input}
            disabled={input.name === 'city'}
            onKeyPress={(e) => onInputKeyPress(e, index)}
          />
        </input_frame>
      ))}
    </filter>
  );
};
