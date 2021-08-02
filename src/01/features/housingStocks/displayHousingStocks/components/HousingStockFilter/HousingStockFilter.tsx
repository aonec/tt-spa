import { StyledInput, StyledSelctor } from '01/shared/ui/Fields';
import { Flex } from '01/shared/ui/Layout/Flex';
import { Select } from 'antd';
import React, { useRef } from 'react';
import styled from 'styled-components';
import { useFilter } from './useFilter.hook';

const cities = ['Большое Афанасово', 'Нижнекамск', 'Красный ключ'];

export const HousingStockFilter = () => {
  const { filterFields, setValue } = useFilter();

  const onChangeHandler = (e: any) => setValue(e.target.name, e.target.value);

  const refs: any[] = [useRef(), useRef(), useRef(), useRef()];

  const onKeyDownHandler = (e: any, index: number) => {
    if (e.key !== 'Enter') return;

    const nextRef = refs[refs.length - 1 === index ? 0 : index + 1];

    nextRef && nextRef.current.focus();
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
      />
      <StyledInput
        name="HousingStockNumber"
        placeholder="дом"
        value={filterFields.HousingStockNumber}
        onChange={onChangeHandler}
        onKeyDown={(e) => onKeyDownHandler(e, 2)}
        ref={refs[2]}
      />
      <StyledInput
        name="Corpus"
        placeholder="Корпус"
        value={filterFields.Corpus}
        onChange={onChangeHandler}
        onKeyDown={(e) => onKeyDownHandler(e, 3)}
        ref={refs[3]}
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
