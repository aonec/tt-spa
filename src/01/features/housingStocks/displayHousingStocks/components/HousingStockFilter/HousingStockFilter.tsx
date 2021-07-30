import { Flex } from '01/shared/ui/Layout/Flex';
import React from 'react';
import styled from 'styled-components';
import { useFilter } from './useFilter.hook';

export const HousingStockFilter = () => {
  const { filterFields, setValue } = useFilter();

  return (
    <FieldsWrap>
      <StyledInput placeholder="Название улицы" />
      <StyledInput placeholder="дом" />
      <StyledInput placeholder="Корпус" />
    </FieldsWrap>
  );
};

const FieldsWrap = styled(Flex)``;
const StyledInput = styled.input`
  border: 1px solid lightgray;
  margin-left: 15px;
  padding: 3px 15px;
  :first-child {
    margin-left: 0;
  }
  box-sizing: border-box;
  border-radius: 4px;

  --active: var(--primary-100);
    display: grid;
    grid-template-columns: auto 1fr auto;
    grid-gap: 8px;
    border: 1px solid var(--frame);
    border-radius: 4px;
    position: relative;
    height: var(--h-norm);
    background: #fff;
    z-index: 10;
    color: var(--main-80);
    overflow: hidden;
    padding: 0 8px;
    cursor: text;
`;
