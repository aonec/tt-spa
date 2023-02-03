import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';
import { CalculatorIcon } from 'ui-kit/icons';
import {
  CalculatorItem,
  Name,
  NameWrap,
  Serial,
  Wrapper,
} from './ConnectionSettings.styled';
import { ConnectionSettingsProps } from './ConnectionSettings.types';

export const ConnectionSettings: FC<ConnectionSettingsProps> = ({
  hubConnection,
}) => {
  return (
    <Wrapper>
      <NavLink to={`/calculators/${hubConnection?.calculatorId}`}>
        <CalculatorItem>
          <CalculatorIcon />
          <NameWrap>
            <Name>{hubConnection?.calculatorModel || 'Вычислитель'}</Name>
            <Serial>{` (${hubConnection?.calculatorSerialNumber})`}</Serial>
          </NameWrap>
        </CalculatorItem>
      </NavLink>
    </Wrapper>
  );
};
