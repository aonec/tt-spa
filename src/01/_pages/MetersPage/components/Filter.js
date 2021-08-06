import React, { useRef } from 'react';
import styled from 'reshadow/macro';
import { input } from '01/r_comp';
import { getArrayByCountRange } from './utils';
import { useHistory } from 'react-router-dom';

export const Filter = ({ inputs = [] }) => {
  const inputsRefs = getArrayByCountRange(inputs.length, useRef);
  const history = useHistory();

  const onInputKeyPress = (e, index) => {
    e.stopPropagation();

    if (e.key !== 'Enter') return;

    const isLastInput = index + 1 === inputs.length;

    console.log(history.location.pathname);

    if (
      isLastInput &&
      !(
        history.location.pathname === '/meters/apartments' ||
        history.location.pathname === '/meters/apartments/'
      )
    ) {
      const node = document.getElementsByClassName('ant-input')[1];

      node && node.focus();

      return;
    }

    const neededRef = isLastInput ? inputsRefs[1] : inputsRefs[index + 1];

    if (!neededRef) return;

    neededRef.current.focus();
  };

  return styled(input)`
    filter {
      margin-bottom: 15px;
      grid-column: 1 / -1;
      display: grid;
      grid-template-columns:
        minmax(100px, 1fr)
        minmax(100px, 1fr)
        minmax(100px, 0.5fr)
        minmax(100px, 0.5fr)
        minmax(100px, 1fr);
      grid-gap: 16px;
    }
  `(
    <filter as="div">
      {inputs.map((input, index) => (
        <input_frame data-disabled={input.disabled} key={input.name}>
          <input
            ref={inputsRefs[index]}
            {...input}
            disabled={input.disabled}
            onKeyPress={(e) => onInputKeyPress(e, index)}
          />
        </input_frame>
      ))}
    </filter>
  );
};
