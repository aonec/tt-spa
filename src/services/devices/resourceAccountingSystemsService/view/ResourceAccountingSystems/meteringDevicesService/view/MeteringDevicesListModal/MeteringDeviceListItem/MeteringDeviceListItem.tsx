import React, { FC } from 'react';
import { WarningIcon } from 'ui-kit/icons';
import { ContextMenuButton } from '01/shared/ui/ContextMenuButton';
import { MagistralsDisctionary } from 'dictionaries';
import {
  AdditionalInfo,
  BaseInfo,
  Model,
  ModelWrapper,
  SerialNumber,
  WarningIconWrapper,
  Wrapper,
} from './MeteringDeviceListItem.styled';
import { MeteringDeviceListItemProps } from './MeteringDeviceListItem.types';
import { useHistory } from 'react-router-dom';

export const MeteringDeviceListItem: FC<MeteringDeviceListItemProps> = ({
  device,
}) => {
  const history = useHistory();

  return (
    <Wrapper>
      <BaseInfo>
        <ModelWrapper
          onClick={() => history.push(`/housingMeteringDevices/${device.id}`)}
        >
          <Model>{device.model}</Model>
          <SerialNumber>({device.serialNumber})</SerialNumber>
        </ModelWrapper>
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
