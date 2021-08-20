import React from 'react';
import { IndividualDeviceGate } from '01/features/individualDevices/displayIndividualDevice/models';
import { useParams } from 'react-router-dom';
import { ReadingHistoryHeader } from './components/Header';
import { ReadingsHistoryList } from './components/ReadingsHistoryList';
import { ReadingHistoryGate } from './models';

export const ReadingHistoryPage = () => {
  const { deviceId } = useParams<{ id: string; deviceId: string }>();
  return (
    <>
      <IndividualDeviceGate id={Number(deviceId)} />
      <ReadingHistoryGate deviceId={Number(deviceId)} />
      <ReadingHistoryHeader />
      <ReadingsHistoryList />
    </>
  );
};
