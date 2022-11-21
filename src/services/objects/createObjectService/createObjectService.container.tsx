import { useStore } from 'effector-react';
import React from 'react';
import { addressSearchService } from 'services/addressSearchService/addressSearchService.models';
import { CreateObjectPage } from './view/CreateObjectPage';

const { outputs } = addressSearchService;

export const CreateObjectContainer = () => {
  const existingCities = useStore(outputs.cities);
  const existingStreets = useStore(outputs.streets);

  console.log(existingCities);

  return (
    <>
      <CreateObjectPage
        existingCities={existingCities}
        existingStreets={existingStreets}
      />
    </>
  );
};
