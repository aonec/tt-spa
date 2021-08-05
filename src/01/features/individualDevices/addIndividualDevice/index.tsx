import React from 'react';
import { CheckFormValuesModal } from './components/CheckFormValuesModal';
import { CreateIndividualDeviceForm } from './components/CreateIndividualDeviceForm';
import { Grid } from './components/Grid';
import { CreateIndividualDeviceFormHeader } from './components/Header';
import { CreateIndividualDeviceFormStages } from './components/Stages';

export const AddIndividualDevice = () => (
  <>
    <CheckFormValuesModal />
    <CreateIndividualDeviceFormHeader />
    <Grid>
      <CreateIndividualDeviceForm />
      <CreateIndividualDeviceFormStages />
    </Grid>
  </>
);
