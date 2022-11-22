import { useEvent, useStore } from 'effector-react';
import React from 'react';
import { addressSearchService } from 'services/addressSearchService/addressSearchService.models';
import { createObjectService } from './createObjectService.model';
import { CreateObjectPage } from './view/CreateObjectPage';

const { inputs, outputs, gates } = createObjectService;
const { HouseManagementsFetchGate } = gates;

export const CreateObjectContainer = () => {
  const existingCities = useStore(addressSearchService.outputs.cities);
  const existingStreets = useStore(addressSearchService.outputs.streets);

  const stageNumber = useStore(outputs.$stageNumber);
  const houseManagements = useStore(outputs.$houseManagements);
  const handleAddressData = useEvent(inputs.handleAddressData);

  return (
    <>
      <HouseManagementsFetchGate />
      <CreateObjectPage
        existingCities={existingCities}
        existingStreets={existingStreets}
        stageNumber={stageNumber}
        handleAddressData={handleAddressData}
        houseManagements={houseManagements}
      />
    </>
  );
};
