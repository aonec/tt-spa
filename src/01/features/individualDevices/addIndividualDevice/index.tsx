import React from 'react';
import { Grid } from './components/Grid';
import { CreateIndividualDeviceFormHeader } from './components/Header';
import { CreateIndividualDeviceFormStages } from './components/Stages';

export const AddIndividualDevice = () => {
  return (
    <>
      <CreateIndividualDeviceFormHeader />
      <Grid>
        <div>form</div>
        <CreateIndividualDeviceFormStages />
      </Grid>
    </>
  );
};
