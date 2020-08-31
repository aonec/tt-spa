import React from 'react';
import styled from 'styled-components';

const InputWrap = styled.div`
  width: 160px;
  border: 1px solid #dcdee4;
  box-sizing: border-box;
  border-radius: 4px;
  display: grid;
  padding: 0 8px;
`;

const Row = styled.div`
  padding: 8px;
  display: grid;
  grid-template-columns: 6fr 6fr;
  border-bottom: 1px solid #dcdee4;
  :last-of-type {
    border-bottom: none;
  }
`;

const Plan = styled.h4`
  padding: 0;
  margin: 0;
  font-size: 14px;
  line-height: 16px;
  color: rgba(39, 47, 90, 0.6);
`;

const Input = styled.input`
  padding: 0;
  margin: 0;
  font-size: 14px;
  line-height: 16px;
  color: rgba(39, 47, 90, 0.32);
`;

export function ApartmentInput() {
  return (
    <InputWrap>
      <Row>
        <Plan>Тариф 1</Plan>
        <Input placeholder="123 м3" />
      </Row>
      <Row>
        <Plan>Тариф 2</Plan>
        <Input placeholder="123 м3" />
      </Row>
    </InputWrap>
  );
}

export default ApartmentInput;
