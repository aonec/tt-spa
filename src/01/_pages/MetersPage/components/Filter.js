import React, { useRef } from 'react';
import styled from 'reshadow/macro';
import { input } from '01/r_comp';
import { getArrayByCountRange } from './utils';
import { useHistory } from 'react-router-dom';
import { AutoComplete } from 'antd';
import { ExistingStreetsGate } from '01/features/housingStocks/displayHousingStockStreets/model';

export const Filter = ({ inputs = [] }) => {
  const inputsRefs = getArrayByCountRange(inputs.length, useRef);
  const history = useHistory();

  const onInputKeyPress = (e, index) => {
    e.stopPropagation();

    if (e.key !== 'Enter') return;

    const isLastInput = index + 1 === inputs.length;

    if (isLastInput) {
      if (
        history.location.pathname === '/meters/apartments' ||
        history.location.pathname === '/meters/apartments/'
      ) {
        e.target.blur && e.target.blur();

        return;
      }

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
      <ExistingStreetsGate
        Street={inputs.find((elem) => elem.name === 'street').value}
      />
      {inputs.map((input, index) => (
        <AutoComplete
          options={input.options}
          ref={inputsRefs[index]}
          onKeyPress={(e) => onInputKeyPress(e, index)}
          {...input}
          onFocus={() => input.onFocus(input.name)}
        />
      ))}
    </filter>
  );
};
