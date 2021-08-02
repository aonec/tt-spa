import { StyledInput, StyledSelctor } from '01/shared/ui/Fields';
import { Flex } from '01/shared/ui/Layout/Flex';
import { Select } from 'antd';
import React from 'react';
import styled from 'styled-components';
import { useFilter } from './useFilter.hook';

const cities = ['Большое Афанасово', 'Нижнекамск', 'Красный ключ'];

export const HousingStockFilter = () => {
  const { filterFields, setValue } = useFilter();

  const onChangeHandler = (e: any) => setValue(e.target.name, e.target.value);

  return (
    <FieldsWrap>
      <StyledSelctor
        placeholder="Город"
        value={filterFields.City}
        onChange={(value: any) => setValue('City', value)}
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
      />
      <StyledInput
        name="HousingStockNumber"
        placeholder="дом"
        value={filterFields.HousingStockNumber}
        onChange={onChangeHandler}
      />
      <StyledInput
        name="Corpus"
        placeholder="Корпус"
        value={filterFields.Corpus}
        onChange={onChangeHandler}
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
