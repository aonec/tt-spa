import React from 'react';
import { ActsJournalProfile } from './view/ActsJournalProfile';
import { actsJournalService } from './actsJournalService.model';
import { useUnit } from 'effector-react';
import './actsJournalService.relations';
import { addressSearchService } from 'services/addressSearchService/addressSearchService.models';

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
  } = useUnit({
    handleCreateAct: inputs.createAct,
    updateActsFilter: inputs.updateActsFilter,
    setPageNumber: inputs.setPageNumber,
    isCreateLoading: outputs.$isCreateLoading,
    isActsLoading: outputs.$isActsLoading,
    actsPagedData: outputs.$actsPagedData,
    actsFilter: outputs.$actsFilter,
    handleResetAddressSearchForm: addressSearchService.inputs.handleResetForm,
  });

  const actCreated = inputs.actCreated;

  return (
    <>
      <ActsJournalGate />
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
      />
    </>
  );
};
