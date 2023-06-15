import { useUnit } from 'effector-react';
import React from 'react';
import { addIndividualDeviceService } from './addIndividualDeviceService.model';
import { AddIndividualDevicePage } from './AddIndividualDevicePage';
import { useParams } from 'react-router-dom';

const { inputs, outputs, gates } = addIndividualDeviceService;

const { ApartmentGate } = gates;

export const AddIndividualDeviceContainer = () => {
  const { id } = useParams<{ id: string }>();

  const [stageNumber, handleGoNextStage, handleGoPrevStage] = useUnit([
    outputs.$stageNumber,
    inputs.handleGoNextStage,
    inputs.handleGoPrevStage,
  ]);

  const apartment = useUnit(outputs.$apartment);

  const currentFetchedApartmentId = apartment?.id;
  const idFromParams = Number(id);

  const isNeedToFetch = currentFetchedApartmentId === idFromParams;

  return (
    <>
      {<ApartmentGate id={idFromParams} />}
      <AddIndividualDevicePage
        stageNumber={stageNumber}
        handleGoNextStage={handleGoNextStage}
        handleGoPrevStage={handleGoPrevStage}
        apartment={apartment}
      />
    </>
  );
};
