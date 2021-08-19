import React from 'react';
import { IndividualDeviceGate } from '01/features/individualDevices/displayIndividualDevice/models';
import { useParams } from 'react-router-dom';
import { ReadingHistoryHeader } from './components/Header';

export const ReadingHistory = () => {
  const { deviceId } = useParams<{ id: string; deviceId: string }>();
  return (
    <>
      <IndividualDeviceGate id={Number(deviceId)} />
      <ReadingHistoryHeader />
    </>
  );
};
