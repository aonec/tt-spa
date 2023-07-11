import React from 'react';
import { getApartmentFromFullAddress } from 'utils/getApartmentFromFullAddress';
import { IndividualDeviceInfo } from 'ui-kit/shared_components/IndividualDeviceInfo';
import { HeaderProps } from './ReadingsHistoryHeader.types';
import { Header } from './ReadingsHistoryHeader.styled';
import { useDeviceCheckingDates } from './ReadingsHistoryHeader.utils';
import { Skeleton } from 'antd';

export const ReadingHistoryHeader: React.FC<HeaderProps> = ({
  individualDevice,
}) => {
  const address = getApartmentFromFullAddress(
    individualDevice?.address || null,
  );

  const checkingDates = useDeviceCheckingDates(individualDevice);

  if (!individualDevice) return <Skeleton.Input />;

  return (
    <Header>
      {individualDevice && <IndividualDeviceInfo device={individualDevice} />}
      <div>{address}</div>
      <b>{checkingDates}</b>
    </Header>
  );
};
