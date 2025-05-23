import React from 'react';
import { ActsJournalProfile } from './view/ActsJournalProfile';
import { actsJournalService } from './actsJournalService.model';
import { useUnit } from 'effector-react';
import './actsJournalService.relations';
import { addressSearchService } from 'services/addressSearchService/addressSearchService.models';
import { AddDocumentModal } from './view/ActsJournalProfile/AddDocumentModal';
import { DocumentViewModal } from './view/ActsJournalProfile/DocumentViewModal';
import { addressIdSearchService } from './addressIdSearchService';

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
    isUploading,
    isViewModalOpen,
    setViewModalOpen,
    handleDeleteDoc,
    handleOpenDoc,
    docUrl,
    resetActAddress,
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
    isUploading: outputs.$isUploading,
    isViewModalOpen: outputs.$isViewModalOpen,
    setViewModalOpen: inputs.setViewModalOpen,
    handleDeleteDoc: inputs.handleDeleteDoc,
    handleOpenDoc: inputs.handleOpenDoc,
    docUrl: outputs.$docUrl,
    resetActAddress: addressIdSearchService.inputs.resetAddress,
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
        isUploading={isUploading}
      />
      <DocumentViewModal
        isViewModalOpen={isViewModalOpen}
        setViewModalOpen={setViewModalOpen}
        docUrl={docUrl || uploadedFile?.url || null}
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
        setViewModalOpen={setViewModalOpen}
        handleDeleteDoc={handleDeleteDoc}
        handleOpenDoc={handleOpenDoc}
        resetActAddress={resetActAddress}
      />
    </>
  );
};
