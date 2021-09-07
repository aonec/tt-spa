import React, { useRef } from 'react';
import styled from 'reshadow/macro';
import { input } from '01/r_comp';
import { getArrayByCountRange } from './utils';
import { ExistingStreetsGate } from '01/features/housingStocks/displayHousingStockStreets/model';
import { StyledAutocomplete } from '01/shared/ui/Fields';
import { useFilter } from '../hooks/useFilter';
import { Radio } from 'antd';
import { Space } from '../../../shared/ui/Layout/Space/Space';
import { useHistory, Route, useParams } from 'react-router-dom';
import { useState } from 'react';
import { Apartments } from './Apartments';
import { SerialNumberSearch } from './SerialNumberSearch';

export const Filter = () => {
  const { inputs } = useFilter();
  const inputsRefs = getArrayByCountRange(inputs.length, useRef);
  const history = useHistory();
  const [searchContext, setSearchContext] = useState(1);

  const onInputKeyPress = (e, index) => {
    e.stopPropagation();

    if (e.key !== 'Enter') return;

    const isLastInput = index === inputs.length - 1;

    if (e.target.name === 'apart') {
      e.target.blur && e.target.blur();

      return;
    }

    const neededRef = isLastInput ? inputsRefs[1] : inputsRefs[index + 1];

    if (!neededRef) return;

    neededRef.current.focus();
  };

  const isSerialNumberPage = searchContext === 2;

  const serialNumberComponent = (
    <>
      <SerialNumberSearch setSearchContext={setSearchContext} />
    </>
  );

  return (
    <>
      <Radio.Group
        value={searchContext}
        onChange={({ target: { value } }) => {
          if (value === 2) history.push('/meters/apartments');

          if (value === 1) history.goBack();

          setSearchContext(value);
        }}
      >
        <Radio value={1}>Поиск по адресу</Radio>
        <Radio value={2}>Поиск по серийному номеру</Radio>
      </Radio.Group>
      <Space style={{ minHeight: 20 }} />
      {isSerialNumberPage ? (
        serialNumberComponent
      ) : (
        <>
          {styled(input)`
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
                  onKeyDown={(e) => onInputKeyPress(e, index)}
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
          )}
          <Route path="/meters/apartments" exact>
            <Apartments />
          </Route>
        </>
      )}
    </>
  );
};
