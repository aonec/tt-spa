import { StyledInput, StyledSelctor } from '01/shared/ui/Fields';
import { Flex } from '01/shared/ui/Layout/Flex';
import { Select } from 'antd';
import React, { useRef } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { useRedirectBetweenMetersPages } from '../../hooks/useRedirectsBetweenMetersPages';
import { useFilter, filterValuesInit } from './useFilter.hook';

const cities = ['Большое Афанасово', 'Нижнекамск', 'Красный ключ'];

export const HousingStockFilter = () => {
  const { filterFields, setValue, setFilterFields } = useFilter();

  useRedirectBetweenMetersPages(filterFields);

  const history = useHistory();

  const refs: any[] = [useRef(), useRef(), useRef(), useRef()];

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

    nextRef && nextRef.current.focus();
  };

  const onChangeHandler = (e: any) => setValue(e.target.name, e.target.value);

  const onFocus = (e: any) => {
    setValue(e.target.name, '');

    if (e.target.name === 'Street')
      setFilterFields((prev) => ({ ...filterValuesInit, City: prev.City }));
  };

  return (
    <FieldsWrap>
      <StyledSelctor
        placeholder="Город"
        value={filterFields.City || undefined}
        onChange={(value: any) => setValue('City', value)}
        ref={refs[0]}
        onKeyDown={(e) => onKeyDownHandler(e, 0)}
      >
        {cities.map((city) => (
          <Select.Option value={city}>{city}</Select.Option>
        ))}
      </StyledSelctor>
      <StyledInput
        placeholder="Название улицы"
        onChange={onChangeHandler}
        name="Street"
        value={filterFields.Street}
        onKeyDown={(e) => onKeyDownHandler(e, 1)}
        ref={refs[1]}
        onFocus={onFocus}
      />
      <StyledInput
        name="HousingStockNumber"
        placeholder="дом"
        value={filterFields.HousingStockNumber}
        onChange={onChangeHandler}
        onKeyDown={(e) => onKeyDownHandler(e, 2)}
        ref={refs[2]}
        onFocus={onFocus}
      />
      <StyledInput
        name="Corpus"
        placeholder="Корпус"
        value={filterFields.Corpus}
        onChange={onChangeHandler}
        onKeyDown={(e) => onKeyDownHandler(e, 3)}
        ref={refs[3]}
        onFocus={onFocus}
      />
    </FieldsWrap>
  );
};

const FieldsWrap = styled(Flex)`
  height: 50px;
  display: grid;
  grid-template-columns: 1fr 2fr 0.7fr 0.7fr;
  grid-gap: 15px;
`;
