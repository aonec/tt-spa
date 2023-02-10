import { Empty } from 'antd';
import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';
import { CalculatorIcon } from 'ui-kit/icons';
import {
  CalculatorItem,
  Name,
  NameWrap,
  Serial,
} from './ConnectionSettings.styled';
import { ConnectionSettingsProps } from './ConnectionSettings.types';

export const ConnectionSettings: FC<ConnectionSettingsProps> = ({
  hubConnection,
}) => {
  const isConnected = Boolean(hubConnection?.calculatorId);

  return (
    <>
      {isConnected && (
        <NavLink to={`/calculators/${hubConnection?.calculatorId}`}>
          <CalculatorItem>
            <CalculatorIcon />
            <NameWrap>
              <Name>{hubConnection?.calculatorModel || 'Вычислитель'}</Name>
              <Serial>{` (${hubConnection?.calculatorSerialNumber})`}</Serial>
            </NameWrap>
          </CalculatorItem>
        </NavLink>
      )}
      {!isConnected && <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />}
    </>
  );
};
