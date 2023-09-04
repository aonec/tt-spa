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
import dayjs from 'api/dayjs';

export const IndividualDeviceInfoShort: FC<IndividualDeviceInfoShortProps> = ({
  device,
  onClick,
}) => {
  const modelDescription = `${device.model || ''} ${device.mountPlace || ''}`;

  const isSealExist = device.sealNumber;
  const sealInstallationDate = device.sealInstallationDate
    ? `(${dayjs(device.sealInstallationDate).format('DD.MM.YYYY')})`
    : '';

  return (
    <Wrapper
      onClick={() => device.id && onClick?.(device.id)}
      clickable={Boolean(onClick)}
    >
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
