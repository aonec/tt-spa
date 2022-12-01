import { useEvent, useStore } from 'effector-react';
import React from 'react';
import { useHistory } from 'react-router-dom';
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
  const createObjectData = useStore(outputs.$createObjectData);
  console.log(createObjectData);
  
  const heatingStations = useStore(outputs.$heatingStations);

  const handleSubmitCreateObject = useEvent(inputs.handleSubmitCreateObject);

  const goBackStage = useEvent(inputs.goBackStage);

  const history = useHistory();
  const onPageCancel = () => history.goBack();

  return (
    <>
      <HouseManagementsFetchGate />
      <CreateObjectPage
        existingCities={existingCities}
        existingStreets={existingStreets}
        createObjectData={createObjectData}
        stageNumber={stageNumber}
        houseManagements={houseManagements}
        goBackStage={() => goBackStage()}
        onPageCancel={onPageCancel}
        handleSubmitCreateObject={handleSubmitCreateObject}
        heatingStations={heatingStations}
      />
    </>
  );
};
