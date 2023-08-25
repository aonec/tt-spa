import React from 'react';
import { NumberRangeProps } from './NumberRange.types';
import { Input, Wrapper } from './NumberRange.styled';
import { ArrowRight } from 'react-bootstrap-icons';

export const NumberRange: React.FC<NumberRangeProps> = (props) => {
  const { value, onChange, disabled } = props;
  return (
    <Wrapper disabled={disabled}>
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
    </Wrapper>
  );
};
