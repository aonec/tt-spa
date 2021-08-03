import React from 'react';
import { CreateIndividualDeviceForm } from './components/CreateIndividualDeviceForm';
import { Grid } from './components/Grid';
import { CreateIndividualDeviceFormHeader } from './components/Header';
import { CreateIndividualDeviceFormStages } from './components/Stages';

export const AddIndividualDevice = () => {
  return (
    <>
      <CreateIndividualDeviceFormHeader />
      <Grid>
        <CreateIndividualDeviceForm />
        <CreateIndividualDeviceFormStages />
      </Grid>
    </>
  );
};
