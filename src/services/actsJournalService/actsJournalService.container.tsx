import React from 'react';
import { ActsJournalProfile } from './view/ActsJournalProfile';
import { actsJournalService } from './actsJournalService.model';
import { useUnit } from 'effector-react';
import './actsJournalService.relations';
import { addressSearchService } from 'services/addressSearchService/addressSearchService.models';
import { AddDocumentModal } from './view/ActsJournalProfile/AddDocumentModal';

const { inputs, outputs, gates } = actsJournalService;
const { ActsJournalGate } = gates;

export const ActsJournalContainer = () => {
  const {
    actsFilter,
    actsPagedData,
    handleCreateAct,
    handleResetAddressSearchForm,
    isActsLoading,
    isCreateLoading,
    setPageNumber,
    updateActsFilter,
    setModalOpen,
    isDocumentModalOpen,
    setFile,
    file,
    handleUploadFile,
    uploadedFile,
  } = useUnit({
    handleCreateAct: inputs.createAct,
    updateActsFilter: inputs.updateActsFilter,
    setPageNumber: inputs.setPageNumber,
    isCreateLoading: outputs.$isCreateLoading,
    isActsLoading: outputs.$isActsLoading,
    actsPagedData: outputs.$actsPagedData,
    actsFilter: outputs.$actsFilter,
    handleResetAddressSearchForm: addressSearchService.inputs.handleResetForm,
    setModalOpen: inputs.setModalOpen,
    isDocumentModalOpen: outputs.$isDocumentModalOpen,
    setFile: inputs.setFile,
    file: outputs.$file,
    handleUploadFile: inputs.handleUploadFile,
    uploadedFile: outputs.$uploadedFile,
  });

  const actCreated = inputs.actCreated;

  return (
    <>
      <ActsJournalGate />
      <AddDocumentModal
        setModalOpen={setModalOpen}
        isModalOpen={isDocumentModalOpen}
        setFile={setFile}
        file={file}
        handleUploadFile={handleUploadFile}
      />
      <ActsJournalProfile
        handleCreateAct={handleCreateAct}
        isCreateLoading={isCreateLoading}
        isActsLoading={isActsLoading}
        actsPagedData={actsPagedData}
        updateActsFilter={updateActsFilter}
        actsFilter={actsFilter}
        setPageNumber={setPageNumber}
        actCreated={actCreated}
        handleResetAddressSearchForm={handleResetAddressSearchForm}
        setModalOpen={setModalOpen}
        uploadedFile={uploadedFile}
      />
    </>
  );
};
