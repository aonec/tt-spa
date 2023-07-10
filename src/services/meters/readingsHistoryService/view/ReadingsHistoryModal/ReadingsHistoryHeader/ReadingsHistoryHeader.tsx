import React from 'react';
import { getApartmentFromFullAddress } from 'utils/getApartmentFromFullAddress';
import { DeviceDataString } from '01/features/individualDevices/switchIndividualDevice/components/DeviceDataString';
import { DeviceStatus } from 'ui-kit/shared_components/IndividualDeviceInfo/DeviceStatus';
import { HeaderProps } from './ReadingsHistoryHeader.types';
import { Header } from './ReadingsHistoryHeader.styled';
import { useDeviceCheckingDates } from './ReadingsHistoryHeader.utils';

export const ReadingHistoryHeader: React.FC<HeaderProps> = ({
  individualDevice,
}) => {
  const address = getApartmentFromFullAddress(
    individualDevice?.address || null,
  );

  const checkingDates = useDeviceCheckingDates(individualDevice);

  return (
    <Header>
      <DeviceDataString />
      <DeviceStatus isActive={individualDevice?.closingDate === null} />
      <div>{address}</div>
      <b>{checkingDates}</b>
    </Header>
  );
};
