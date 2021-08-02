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

const FieldsWrap = styled(Flex)`
  height: 50px;
`;

const StyledInput = styled.input`
  border: 1px solid lightgray;
  margin-left: 15px;
  padding: 3px 15px;
  :first-child {
    margin-left: 0;
  }
  box-sizing: border-box;
  border-radius: 4px;

  border: 1px solid var(--frame);
  height: var(--h-norm);
  z-index: 1000;

  box-shadow: 0 4px 7px #02011b20;

  &:hover {
    border: 1px solid #2317cc;
  }
`;
