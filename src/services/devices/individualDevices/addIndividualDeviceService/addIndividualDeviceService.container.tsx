import { useUnit } from 'effector-react';
import React, { useEffect } from 'react';
import { addIndividualDeviceService } from './addIndividualDeviceService.model';
import { AddIndividualDevicePage } from './AddIndividualDevicePage';
import { useHistory, useParams } from 'react-router-dom';
import { PreviewModal } from './AddIndividualDevicePage/PreviewModal/PreviewModal';

const { inputs, outputs, gates } = addIndividualDeviceService;
const { ApartmentGate, PageGate } = gates;

export const AddIndividualDeviceContainer = () => {
  const { id } = useParams<{ id: string }>();
  const history = useHistory();

  const [stageNumber, handleGoPrevStage] = useUnit([
    outputs.$stageNumber,
    inputs.handleGoPrevStage,
  ]);

  const [formData, handleSubmitForm] = useUnit([
    outputs.$formData,
    inputs.handleSubmitForm,
  ]);

  const [documents, handleSubmitDocumentStage] = useUnit([
    outputs.$documents,
    inputs.handleSubmitDocumentStage,
  ]);

  const [isModalOpen, handleCloseModal] = useUnit([
    outputs.$isModalOpen,
    inputs.handleCloseModal,
  ]);

  const apartment = useUnit(outputs.$apartment);
  const mountPlaces = useUnit(outputs.$individualDeviceMountPlaces);
  const modelNames = useUnit(outputs.$individualDevicesNames);
  const contractors = useUnit(outputs.$contractors);
  const serialNumberForChecking = useUnit(outputs.$serialNumberForChecking);
  const isFetchSerialNumberLoading = useUnit(
    outputs.$isFetchSerialNumberLoading,
  );
  const isLoading = useUnit(outputs.$isLoading);
  const isDocumentUploadLoading = useUnit(outputs.$isDocumentUploadLoading);

  const handleFetchSerialNumberForCheck = useUnit(
    inputs.handleFetchSerialNumberForCheck,
  );
  const handleCreateDevice = useUnit(inputs.handleCreateDevice);

  const idFromParams = Number(id);

  useEffect(() => {
    return inputs.successCreateIndividualDevice.watch(history.goBack)
      .unsubscribe;
  }, [history.goBack]);

  return (
    <>
      <PageGate />
      <ApartmentGate id={idFromParams} />
      <PreviewModal
        isModalOpen={isModalOpen}
        handleCloseModal={handleCloseModal}
        isLoading={isLoading}
        formData={formData}
        documents={documents}
        mountPlaces={mountPlaces}
        handleCreateDevice={handleCreateDevice}
      />
      <AddIndividualDevicePage
        stageNumber={stageNumber}
        handleGoPrevStage={handleGoPrevStage}
        apartment={apartment}
        mountPlaces={mountPlaces}
        modelNames={modelNames}
        contractors={contractors}
        handleFetchSerialNumberForCheck={handleFetchSerialNumberForCheck}
        isFetchSerialNumberLoading={isFetchSerialNumberLoading}
        serialNumberForChecking={serialNumberForChecking}
        handleSubmitForm={handleSubmitForm}
        formData={formData}
        documents={documents}
        handleSubmitDocumentStage={handleSubmitDocumentStage}
        isDocumentUploadLoading={isDocumentUploadLoading}
      />
    </>
  );
};
