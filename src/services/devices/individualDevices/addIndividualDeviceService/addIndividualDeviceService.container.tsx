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
  const mountPlaces = useUnit(outputs.$individualDeviceMountPlaces);
  const modelNames = useUnit(outputs.$individualDevicesNames);
  const contractors = useUnit(outputs.$contractors);
  const serialNumberForChecking = useUnit(outputs.$serialNumberForChecking);
  const isFetchSerialNumberLoading = useUnit(
    outputs.$isFetchSerialNumberLoading,
  );

  const handleFetchSerialNumberForCheck = useUnit(
    inputs.handleFetchSerialNumberForCheck,
  );

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
        mountPlaces={mountPlaces}
        modelNames={modelNames}
        contractors={contractors}
        handleFetchSerialNumberForCheck={handleFetchSerialNumberForCheck}
        isFetchSerialNumberLoading={isFetchSerialNumberLoading}
        serialNumberForChecking={serialNumberForChecking}
      />
    </>
  );
};
