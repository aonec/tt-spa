import { Flex } from '01/shared/ui/Layout/Flex';
import { Select } from 'antd';
import React from 'react';
import styled from 'styled-components';
import { useFilter } from './useFilter.hook';

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
        <Select.Option value={'Нижнекамск'}>Нижнекамск</Select.Option>
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

const StyledSelctor = styled(Select)`
  width: 100%;
  .ant-select-selector {
    border: 1px solid lightgray;
    padding: 3px 15px;

    border-radius: 4px !important;

    border: 1px solid var(--frame);
    height: var(--h-norm);

    box-shadow: 0 4px 7px #02004b1f;

    &:hover,
    &:focus {
      border: 1px solid #1890ff;
    }

    &:focus {
      box-shadow: 0 2px 7px #188fffae;
    }
  }

  .ant-select-arrow {
    transform: translateY(-9px);
  }
`;

const StyledInput = styled.input`
  color: #333333;
  border: 1px solid lightgray;
  padding: 3px 15px;
  transition: 0.2s;

  &:last-child {
    margin-right: 10px;
  }

  border-radius: 4px;

  border: 1px solid var(--frame);
  height: var(--h-norm);

  box-shadow: 0 4px 7px #02004b1f;

  &:hover,
  &:focus {
    border: 1px solid #1890ff;
  }

  &:focus {
    box-shadow: 0 2px 7px #188fffae;
  }
`;
