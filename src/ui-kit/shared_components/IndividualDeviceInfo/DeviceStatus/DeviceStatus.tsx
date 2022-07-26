import { EClosingReason } from '../../api/types';
import React, { FC } from 'react';
import {
  ClosingReasonText,
  StatusBar,
  StatusText,
  Wrapper,
} from './DeviceStatus.styled';
import { DeviceStatusProps } from './DeviceStatus.types';

export const closingReasonLookup: { [key: string]: string | null } = {
  [EClosingReason.Manually]: 'Плановая замена',
  [EClosingReason.DeviceBroken]: 'Поломка',
  [EClosingReason.CertificateIssued]: 'Выдана справка',
  [EClosingReason.None]: null,
};

export const DeviceStatus: FC<DeviceStatusProps> = ({
  isActive,
  closingReason,
}) => {
  const statusText = isActive ? 'Активен' : 'Закрыт';

  const closingReasonText = closingReasonLookup[closingReason];

  return (
    <Wrapper>
      <StatusBar isActive={isActive} />
      <StatusText>
        {statusText}{' '}
        {closingReasonText && (
          <ClosingReasonText>{closingReasonText}</ClosingReasonText>
        )}
      </StatusText>
    </Wrapper>
  );
};
