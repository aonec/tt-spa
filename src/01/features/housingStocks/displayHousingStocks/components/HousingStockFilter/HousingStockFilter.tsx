import {
  $existingCities,
  ExistingCitiesGate,
} from '01/features/housingStocks/displayHousingStockCities/models';
import {
  $existingStreets,
  ExistingStreetsGate,
} from '01/features/housingStocks/displayHousingStockStreets/model';
import {
  StyledAutocomplete,
  StyledInput,
  StyledSelector,
} from '01/shared/ui/Fields';
import { Flex } from '01/shared/ui/Layout/Flex';
import { useAutocomplete } from '01/_pages/MetersPage/hooks/useFilter';
import { Select } from 'antd';
import { useStore } from 'effector-react';
import React, { useRef } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { useRedirectBetweenMetersPages } from '../../hooks/useRedirectsBetweenMetersPages';
import { fetchHousingStocksFx } from '../../models';
import { useFilter, filterValuesInit } from './useFilter.hook';

export const HousingStockFilter = () => {
  const { filterFields, setValue, setFilterFields } = useFilter();

  useRedirectBetweenMetersPages(filterFields);

  const history = useHistory();

  const refs: any[] = [useRef(), useRef(), useRef()];

  const onKeyDownHandler = (e: any, index: number) => {
    if (e.key !== 'Enter') return;

    const isLastInput = refs.length - 1 === index;

    if (
      isLastInput &&
      !(
        history.location.pathname === '/meters/houses' ||
        history.location.pathname === '/meters/houses/'
      )
    ) {
      const node: any = document.getElementsByClassName('ant-input')[1];

      node?.focus();

      return;
    }

    const nextRef = refs[isLastInput ? 0 : index + 1];

    if (nextRef.current) return nextRef.current.focus();

    const currentNode = refs[index];

    if (currentNode.current) return currentNode.current.blur();
  };

  const onChangeHandler = (e: any) => setValue(e.target.name, e.target.value);

  const onFocus = (e: any) => {
    setValue(e.target.name, '');

    if (e.target.name === 'Street')
      setFilterFields((prev) => ({ ...filterValuesInit, City: prev.City }));
  };

  const existingStreets = useStore($existingStreets);

  const { match: streetMatch, options } = useAutocomplete(
    filterFields.Street,
    existingStreets
  );

  const cities = useStore($existingCities);

  return (
    <FieldsWrap>
      <ExistingCitiesGate />
      <ExistingStreetsGate City={filterFields.City} />
      <StyledSelector
        placeholder="Город"
        value={filterFields.City || undefined}
        onChange={(value: any) => setValue('City', value)}
        ref={refs[0]}
        onKeyDown={(e) => onKeyDownHandler(e, 0)}
      >
        {cities?.map((city) => (
          <Select.Option value={city}>{city}</Select.Option>
        ))}
      </StyledSelector>
      <StyledAutocomplete
        options={options}
        placeholder="Название улицы"
        onChange={(value) => setValue('Street', value)}
        value={filterFields.Street}
        onKeyDown={(e) => {
          fromEnter(() => setValue('Street', streetMatch))(e);
          onKeyDownHandler(e, 1);
        }}
        onClick={() => {
          setValue('Street', '');
          setValue('HousingStockNumber', '');
        }}
        ref={refs[1]}
        onFocus={onFocus}
      />
      <StyledInput
        name="HousingStockNumber"
        placeholder="дом"
        value={filterFields.HousingStockNumber}
        onChange={onChangeHandler}
        onKeyDown={(e) => {
          onKeyDownHandler(e, 2);
          fromEnter(() => fetchHousingStocksFx(filterFields))(e);
        }}
        ref={refs[2]}
        onFocus={onFocus}
      />
    </FieldsWrap>
  );
};

const FieldsWrap = styled(Flex)`
  height: 50px;
  display: grid;
  grid-template-columns: 1fr 2fr 0.7fr;
  grid-gap: 15px;
  margin-top: -9px;
`;

export function fromEnter(callback: () => void) {
  return (e?: any) => {
    if (e?.key === 'Enter') callback();
  };
}
