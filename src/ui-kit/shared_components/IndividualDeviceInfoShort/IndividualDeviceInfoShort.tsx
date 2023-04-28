import React, { FC } from 'react';
import { ResourceIconLookup } from '../ResourceIconLookup';
import {
  IconWrapper,
  Model,
  RowWrapper,
  SealWrapper,
  SerialNumber,
  Wrapper,
} from './IndividualDeviceInfoShort.styled';
import { IndividualDeviceInfoShortProps } from './IndividualDeviceInfoShort.types';
import moment from 'moment';

export const IndividualDeviceInfoShort: FC<IndividualDeviceInfoShortProps> = ({
  device,
  onClick,
}) => {
  const modelDescription = `${device.model || ''} ${device.mountPlace || ''}`;

  const isSealExist = device.sealNumber;
  const sealInstallationDate = device.sealInstallationDate
    ? `(${moment(device.sealInstallationDate).format('DD.MM.YYYY')})`
    : '';

  return (
    <Wrapper onClick={onClick} clickable={Boolean(onClick)}>
      <RowWrapper>
        <IconWrapper>
          {device.resource && <ResourceIconLookup resource={device.resource} />}
        </IconWrapper>
        <SerialNumber>{device.serialNumber}</SerialNumber>
        <Model>{modelDescription}</Model>
      </RowWrapper>
      <SealWrapper>
        {isSealExist && (
          <>
            Пломба
            <span>{device.sealNumber}</span>
            <span>{sealInstallationDate}</span>
          </>
        )}
        {!isSealExist && <span>Нет пломбы</span>}
      </SealWrapper>
    </Wrapper>
  );
};
