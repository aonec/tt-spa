import React, { FC } from 'react';
import { WarningIcon } from 'ui-kit/icons';
import { ContextMenuButton } from '01/shared/ui/ContextMenuButton';
import { MagistralsDisctionary } from 'dictionaries';
import {
  AdditionalInfo,
  BaseInfo,
  Model,
  SerialNumber,
  WarningIconWrapper,
  Wrapper,
} from './MeteringDeviceListItem.styled';
import { MeteringDeviceListItemProps } from './MeteringDeviceListItem.types';

export const MeteringDeviceListItem: FC<MeteringDeviceListItemProps> = ({
  device,
}) => {
  return (
    <Wrapper>
      <BaseInfo>
        <Model>{device.model}</Model>
        <SerialNumber>({device.serialNumber})</SerialNumber>
        {device.hasActiveTasks && (
          <WarningIconWrapper>
            <WarningIcon />
          </WarningIconWrapper>
        )}
      </BaseInfo>
      <AdditionalInfo>Труба: {device.pipeNumber}</AdditionalInfo>
      <AdditionalInfo>{MagistralsDisctionary[device.magistral]}</AdditionalInfo>
      <ContextMenuButton size="small" />
    </Wrapper>
  );
};
