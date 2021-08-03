import { fetchHousingStockFx } from '01/features/housingStocks/displayHousingStock/models';
import { PendingLoader } from '01/shared/ui/PendingLoader';
import { useStore } from 'effector-react';
import React from 'react';
import { CreateIndividualDeviceForm } from './components/CreateIndividualDeviceForm';
import { Grid } from './components/Grid';
import { CreateIndividualDeviceFormHeader } from './components/Header';
import { CreateIndividualDeviceFormStages } from './components/Stages';

export const AddIndividualDevice = () => {
  const pendingHousingStock = useStore(fetchHousingStockFx.pending);

  return (
    <PendingLoader loading={pendingHousingStock}>
      <CreateIndividualDeviceFormHeader />
      <Grid>
        <CreateIndividualDeviceForm />
        <CreateIndividualDeviceFormStages />
      </Grid>
    </PendingLoader>
  );
};
