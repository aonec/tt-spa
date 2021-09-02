import React, { useRef } from 'react';
import styled from 'reshadow/macro';
import { input } from '01/r_comp';
import { getArrayByCountRange } from './utils';
import { useHistory } from 'react-router-dom';
import { ExistingStreetsGate } from '01/features/housingStocks/displayHousingStockStreets/model';
import { StyledAutocomplete } from '01/shared/ui/Fields';
import { useFilter } from '../hooks/useFilter';

export const Filter = () => {
  const { inputs } = useFilter();
  const inputsRefs = getArrayByCountRange(inputs.length, useRef);
  const history = useHistory();

  const onInputKeyPress = (e, index) => {
    e.stopPropagation();

    if (e.key !== 'Enter') return;

    const isLastInput = index + 1 === inputs.length - 1;

    if (isLastInput) {
      e.target.blur && e.target.blur();

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
      <ExistingStreetsGate />
      {inputs.map((input, index) => (
        <StyledAutocomplete
          options={input.options}
          ref={inputsRefs[index]}
          onKeyPress={(e) => onInputKeyPress(e, index)}
          {...input}
          {...(input.name === 'street'
            ? {
                onKeyDown: (e) => {
                  if (e.key !== 'Enter') return;
                  input.onKeyDown(e);
                  inputsRefs[index + 1].current.focus();
                },
              }
            : {})}
          onFocus={() => input.onFocus(input.name)}
        />
      ))}
    </filter>
  );
};
