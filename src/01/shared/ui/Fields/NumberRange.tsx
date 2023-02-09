import React from 'react';
import { ArrowRight } from 'react-bootstrap-icons';
import styled from 'styled-components';
import { Grid } from '../Layout/Grid';

interface INumberRange {
  from: number | null;
  to: number | null;
}

interface Props {
  value: INumberRange;
  onChange: (value: INumberRange) => void;
  disabled?: boolean;
}

export const NumberRange: React.FC<Props> = (props) => {
  const { value, onChange, disabled } = props;
  return (
    <Wrap temp="0.5fr 20px 0.5fr" gap="10px" disabled={disabled}>
      <Input
        placeholder="Введите значение"
        type="number"
        disabled={disabled}
        value={typeof value.from === 'number' ? value.from : ''}
        onChange={(e) => {
          const numberValue = e.target.value;
          onChange({
            ...value,
            from: numberValue === '' ? null : Number(numberValue),
          });
        }}
      />
      <ArrowRight style={{ color: '#c2c2c2' }} />
      <Input
        placeholder="Введите значение"
        type="number"
        disabled={disabled}
        value={typeof value.to === 'number' ? value.to : ''}
        onChange={(e) => {
          const numberValue = e.target.value;
          onChange({
            ...value,
            to: numberValue === '' ? null : Number(numberValue),
          });
        }}
      />
    </Wrap>
  );
};

const Input = styled.input``;

interface WrapProps {
  disabled?: boolean;
}

const Wrap = styled(Grid)`
  align-items: center;
  border: 1px solid lightgray;
  transition: 0.2s;

  border-radius: 4px !important;

  border: 1px solid var(--frame);
  height: var(--h-norm);

  box-shadow: 0 4px 7px #02004b1f;
  padding: 0 10px;
  transition: 0.2s;

  ${({ disabled }: WrapProps) =>
    disabled
      ? `
        background: #f3f3f3; 
        cursor: not-allowed;
        box-shadow: none;
    `
      : `&:hover,
  &:focus {
    border: 1px solid #1890ff;
  }

  &:focus {
    box-shadow: 0 2px 7px #188fffae;
  }`}
`;
