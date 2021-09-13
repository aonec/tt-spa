import React from 'react';
import { useParams } from 'react-router-dom';
import { IndividualDeviceGate } from '../displayIndividualDevice/models';
import { CheckFormValuesModal } from './components/CheckFormValuesModal';
import { CreateIndividualDeviceForm } from './components/CreateIndividualDeviceForm';
import { Grid } from './components/Grid';
import { CreateIndividualDeviceFormHeader } from './components/Header';
import { CreateIndividualDeviceFormStages } from './components/Stages';
import { SwitchIndividualDeviceGate } from './models';

interface Props {
  check?: boolean;
}

export const SwitchIndividualDevice: React.FC<Props> = ({ check }) => {
  const { deviceId } = useParams<{ deviceId: string }>();
  return (
    <>
      <SwitchIndividualDeviceGate check={check} />
      <IndividualDeviceGate id={Number(deviceId)} />
      <CheckFormValuesModal />
      <CreateIndividualDeviceFormHeader />
      <Grid>
        <CreateIndividualDeviceForm />
        <CreateIndividualDeviceFormStages />
      </Grid>
    </>
  );
};
