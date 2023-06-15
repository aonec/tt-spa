import { useUnit } from 'effector-react';
import React from 'react';
import { addIndividualDeviceService } from './addIndividualDeviceService.model';
import { AddIndividualDevicePage } from './AddIndividualDevicePage';
import { useParams } from 'react-router-dom';

const { inputs, outputs, gates } = addIndividualDeviceService;

const { ApartmentGate } = gates;

export const AddIndividualDeviceContainer = () => {
  const { id } = useParams<{ id: string }>();

  const [stageNumber, handleGoFirstStage, handleGoSecondStage] = useUnit([
    outputs.$stageNumber,
    inputs.handleGoFirstStage,
    inputs.handleGoSecondStage,
  ]);

  const apartment = useUnit(outputs.$apartment);

  const currentFetchedApartmentId = apartment?.id;
  const idFromParams = Number(id);

  const isNeedToFetch = currentFetchedApartmentId === idFromParams;

  return (
    <>
      { <ApartmentGate id={idFromParams} />}
      <AddIndividualDevicePage
        stageNumber={stageNumber}
        handleGoFirstStage={handleGoFirstStage}
        handleGoSecondStage={handleGoSecondStage}
        apartment={apartment}
      />
    </>
  );
};
