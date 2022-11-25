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
  const handleAddressData = useEvent(inputs.handleAddressData);
  const handleMainInfoData = useEvent(inputs.handleMainInfoData);
  const handleAdditionalInfoData = useEvent(inputs.handleAdditionalInfoData);
  const goBackStage = useEvent(inputs.goBackStage);

  const history = useHistory();
  const onPageCancel = () => history.goBack();

  const handleSubmitCreateObject = useEvent(inputs.handleSubmitCreateObject);
  return (
    <>
      <HouseManagementsFetchGate />
      <CreateObjectPage
        existingCities={existingCities}
        existingStreets={existingStreets}
        createObjectData={createObjectData}
        stageNumber={stageNumber}
        handleAddressData={handleAddressData}
        handleMainInfoData={handleMainInfoData}
        handleAdditionalInfoData={handleAdditionalInfoData}
        houseManagements={houseManagements}
        goBackStage={() => goBackStage()}
        onPageCancel={onPageCancel}
        handleSubmitCreateObject={handleSubmitCreateObject}
      />
    </>
  );
};
