import React, { FC } from 'react';
import {
  ClosingReasonText,
  StatusBar,
  StatusText,
  Wrapper,
} from './DeviceStatus.styled';
import { DeviceStatusProps } from './DeviceStatus.types';
import { ClosingReasonsDictionary } from 'dictionaries';
import { EClosingReason } from 'api/types';

export const DeviceStatus: FC<DeviceStatusProps> = ({
  isActive,
  closingReason,
}) => {
  const statusText = isActive ? 'Активен' : 'Закрыт';

  const closingReasonText =
    closingReason &&
    closingReason !== EClosingReason.None &&
    ClosingReasonsDictionary[closingReason];

  return (
    <Wrapper>
      <div>
        <StatusBar isActive={isActive} />
      </div>
      <StatusText>
        {statusText}
        {closingReasonText && (
          <ClosingReasonText>{closingReasonText}</ClosingReasonText>
        )}
      </StatusText>
    </Wrapper>
  );
};
