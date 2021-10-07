import React from 'react';
import { IndividualDeviceGate } from '01/features/individualDevices/displayIndividualDevice/models';
import { useParams } from 'react-router-dom';
import { ReadingHistoryHeader } from './components/Header';
import { ReadingsHistoryList } from './components/ReadingsHistoryList';
import { ReadingHistoryGate } from './models';

interface Props {
  deviceId?: number;
  isModal?: boolean;
}

export const ReadingHistoryPage: React.FC<Props> = ({
  deviceId: deviceIdFromProps,
  isModal,
}) => {
  const { deviceId: deviceIdFromUrlParams } = useParams<{ deviceId: string }>();

  const deviceId = deviceIdFromProps || deviceIdFromUrlParams;

  return (
    <>
      <IndividualDeviceGate id={Number(deviceId)} />
      <ReadingHistoryGate deviceId={Number(deviceId)} />
      <ReadingHistoryHeader isModal={isModal} />
      <ReadingsHistoryList isModal={isModal} />
    </>
  );
};
