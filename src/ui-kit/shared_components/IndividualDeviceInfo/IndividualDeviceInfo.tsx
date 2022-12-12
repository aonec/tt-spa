import moment from 'moment';
import React, { FC } from 'react';
import { ResourceIconLookup } from '../ResourceIconLookup';
import { DeviceStatus } from './DeviceStatus';
import {
  CheckingDates,
  Model,
  SerialNumber,
  Wrapper,
} from './IndividualDeviceInfo.styled';
import { IndividualDeviceInfoProps } from './IndividualDeviceInfo.types';

export const IndividualDeviceInfo: FC<IndividualDeviceInfoProps> = ({
  device,
  showCheckingDates,
}) => {
  const isActive = device.closingDate === null;
  const closingReason = device.closingReason;

  const checkingDateInfo = device.lastCheckingDate &&
    device.futureCheckingDate && (
      <CheckingDates>
        {moment(device.lastCheckingDate).format('DD.MM.YYYY')} —{' '}
        {moment(device.futureCheckingDate).format('DD.MM.YYYY')}
      </CheckingDates>
    );

  return (
    <Wrapper>
      <ResourceIconLookup resource={device.resource} />
      <SerialNumber>{device.serialNumber}</SerialNumber>
      <Model>({device.model})</Model>
      <DeviceStatus isActive={isActive} closingReason={closingReason} />
      {showCheckingDates && checkingDateInfo}
    </Wrapper>
  );
};
