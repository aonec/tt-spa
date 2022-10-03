import React, { FC } from 'react';
import { CalculatorIcon } from 'ui-kit/icons';
import {
  CalculatorModel,
  CalculatorSerialNumber,
  WarningIconSC,
  Wrapper,
} from './CalculatorInfo.styled';
import { CalculatorInfoProps } from './CalculatorInfo.types';

export const CalculatorInfo: FC<CalculatorInfoProps> = ({ calculator }) => {
  return (
    <Wrapper>
      <CalculatorIcon />
      <CalculatorModel>{calculator.model}</CalculatorModel>
      {calculator.serialNumber && (
        <CalculatorSerialNumber>
          ({calculator.serialNumber})
        </CalculatorSerialNumber>
      )}
      {calculator.hasActiveTasks && <WarningIconSC />}
    </Wrapper>
  );
};
