import { ReadingHistoryGate } from '01/features/readings/displayReadingHistory/models';
import React from 'react';
import { useParams } from 'react-router-dom';
import { IndividualDeviceGate } from '../displayIndividualDevice/models';
import { CheckFormValuesModal } from './components/CheckFormValuesModal';
import { CreateIndividualDeviceForm } from './components/CreateIndividualDeviceForm';
import { Grid } from './components/Grid';
import { CreateIndividualDeviceFormHeader } from './components/Header';
import { CreateIndividualDeviceFormStages } from './components/Stages';

export const CheckIndividualDevice = () => {
  const { deviceId } = useParams<{ deviceId: string }>();
  return (
    <>
      <IndividualDeviceGate id={Number(deviceId)} />
      <ReadingHistoryGate deviceId={Number(deviceId)} />
      <CheckFormValuesModal />
      <CreateIndividualDeviceFormHeader />
      <Grid>
        <CreateIndividualDeviceForm />
        <CreateIndividualDeviceFormStages />
      </Grid>
    </>
  );
};
